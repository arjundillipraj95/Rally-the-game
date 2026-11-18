import bpy, sys, numpy as np
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
bpy.ops.import_scene.gltf(filepath=sys.argv[-1])
T=[o for o in bpy.data.objects if o.type=='MESH'][0]
me=T.data; img=None
for m in me.materials:
    for n in m.node_tree.nodes:
        if n.type=='TEX_IMAGE' and 'normal' not in n.image.name and 'metal' not in n.image.name: img=n.image
img.scale(1024,1024); px=np.empty(1024*1024*4,np.float32); img.pixels.foreach_get(px); px=px.reshape(-1,4)
uv=me.uv_layers.active.data
co=np.array([T.matrix_world@v.co for v in me.vertices])
bad=set()
for p in me.polygons:
    u=sum(uv[i].uv.x for i in p.loop_indices)/p.loop_total; v=sum(uv[i].uv.y for i in p.loop_indices)/p.loop_total
    q=px[min(1023,int(v%1*1024))*1024+min(1023,int(u%1*1024))]
    if q[2]>.25 and q[2]>q[0]*1.6 and q[2]>q[1]*1.3: bad.update(p.vertices)   # cloak
mask=np.ones(len(co),bool); mask[list(bad)]=False
for side,sx in (('L',1),('R',-1)):
    print('SIDE',side)
    for z in np.arange(.0,.50,.02):
        sel=mask&(np.abs(co[:,2]-z)<.008)&(co[:,0]*sx>.015)&(co[:,0]*sx<.2)
        c=co[sel]
        if len(c)<5: continue
        print(f' z={z:.2f} n={len(c):4d} x[{c[:,0].min():.3f},{c[:,0].max():.3f}] w={np.ptp(c[:,0]):.3f} y[{c[:,1].min():.3f},{c[:,1].max():.3f}] d={np.ptp(c[:,1]):.3f} cx={np.median(c[:,0]):.3f} cy={np.median(c[:,1]):.3f}')
