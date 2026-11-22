import bpy, bmesh, sys, numpy as np, math
from mathutils import Vector
src, out, rule = sys.argv[-3], sys.argv[-2], sys.argv[-1]
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
bpy.ops.import_scene.gltf(filepath=src)
T=[o for o in bpy.data.objects if o.type=='MESH'][0]
bm=bmesh.new(); bm.from_mesh(T.data); bmesh.ops.remove_doubles(bm,verts=bm.verts,dist=1e-5)
f=eval('lambda x,y,z: '+rule)
dele=[v for v in bm.verts if f(*(T.matrix_world@v.co))]
print('delete',len(dele)); bmesh.ops.delete(bm,geom=dele,context='VERTS')
# drop tiny loose bits left behind
bm.verts.index_update(); bm.verts.ensure_lookup_table()
seen=set(); comps=[]
for v in bm.verts:
    if v.index in seen: continue
    st=[v]; c=[]; seen.add(v.index)
    while st:
        u=st.pop(); c.append(u)
        for e in u.link_edges:
            w2=e.other_vert(u)
            if w2.index not in seen: seen.add(w2.index); st.append(w2)
    comps.append(c)
comps.sort(key=len, reverse=True)
small=[v for c in comps[1:] for v in c]; print('loose bits', len(small)); bmesh.ops.delete(bm,geom=small,context='VERTS')
uvl=bm.loops.layers.uv.active
vuv={}
for fc in bm.faces:
    for l in fc.loops: vuv.setdefault(l.vert.index, l[uvl].uv.copy())
bnd=[e for e in bm.edges if e.is_boundary]
old=set(bm.faces)
print('boundary edges',len(bnd)); r=bmesh.ops.holes_fill(bm,edges=bnd,sides=0)
new=[f for f in bm.faces if f not in old]
bmesh.ops.triangulate(bm,faces=new)
new=[f for f in bm.faces if f not in old]
img=None
for m in T.data.materials:
    for n in (m.node_tree.nodes if m and m.use_nodes else []):
        if n.type=='TEX_IMAGE' and 'normal' not in n.image.name and 'metal' not in n.image.name: img=n.image
IW,IH=img.size; px=np.empty(IW*IH*4,np.float32); img.pixels.foreach_get(px); px=px.reshape(IH,IW,4)
blues=[]
for fc in bm.faces:
    if fc in old and fc.is_valid:
        c=T.matrix_world@fc.calc_center_median()
        if c.x>.0 and c.z>.45 and c.z<.75 and c.y>-.05:
            u=sum(l[uvl].uv.x for l in fc.loops)/len(fc.loops); v=sum(l[uvl].uv.y for l in fc.loops)/len(fc.loops)
            q=px[min(IH-1,int(v%1*IH)),min(IW-1,int(u%1*IW))]
            if q[2]>.2 and q[2]>q[0]*1.15 and q[2]>q[1]*1.05: blues.append((u,v))
print('img',img.name,IW,IH,px.reshape(-1,4)[::200000][:8].round(2)); U=np.median(np.array(blues),0) if blues else (0.5,0.5); print('fill uv',U,len(blues))
for fc in new:
    for l in fc.loops: l[uvl].uv=(float(U[0]),float(U[1]))

def fan_fill():
    added=[]
    for _ in range(50):
        be=[e for e in bm.edges if e.is_boundary]
        if not be: break
        e0=be[0]; loop=[e0.verts[0]]; cur=e0.verts[1]; used={e0}
        while cur is not loop[0] and len(loop)<2000:
            loop.append(cur)
            nxt=[e for e in cur.link_edges if e.is_boundary and e not in used]
            if not nxt: break
            used.add(nxt[0]); cur=nxt[0].other_vert(cur)
        if len(loop)<3:
            break
        c=bm.verts.new(sum((v.co for v in loop),Vector())/len(loop))
        for a,b in zip(loop,loop[1:]+loop[:1]):
            try: added.append(bm.faces.new((a,b,c)))
            except ValueError: pass
    return added
extra=fan_fill(); new+=extra
for fc in extra:
    for l in fc.loops: l[uvl].uv=(float(U[0]),float(U[1]))
print('fan faces',len(extra)); bmesh.ops.recalc_face_normals(bm,faces=bm.faces[:]); print('boundary left',sum(1 for e in bm.edges if e.is_boundary))
bm.to_mesh(T.data); bm.free()
bpy.ops.export_scene.gltf(filepath=out.replace('.png','.glb'),export_format='GLB'); print('EXPORTED')
sc=bpy.context.scene; w=bpy.data.worlds.new('w'); sc.world=w; w.use_nodes=True; w.node_tree.nodes['Background'].inputs[0].default_value=(1,1,1,1)
sc.render.engine='CYCLES'; sc.cycles.samples=6; sc.render.resolution_x=600; sc.render.resolution_y=600
cam=bpy.data.objects.new('cam',bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera=cam; cam.data.type='ORTHO'; cam.data.ortho_scale=1.25
c=Vector((0,0,.57))
from PIL import Image
ims=[]
for n,d in [('front',(0,-1,0)),('side',(1,0,0)),('back',(0,1,0)),('rside',(-1,0,0))]:
    pos=c+Vector(d)*5; cam.location=pos; cam.rotation_euler=(c-pos).to_track_quat('-Z','Y').to_euler()
    sc.render.filepath=f'/tmp/c_{n}.png'; bpy.ops.render.render(write_still=True); ims.append(Image.open(f'/tmp/c_{n}.png'))
o=Image.new('RGB',(2400,600),'white')
for i,im in enumerate(ims): o.paste(im,(i*600,0))
o.save(out)
