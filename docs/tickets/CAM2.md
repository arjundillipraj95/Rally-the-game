# CAM2 The turning camera is the default again

Model: O 5.5 · Arjun 26 Nov: the high camera made play worse; the 3rd person view shows more ahead; see-through only on trees · Status: on t/CAM2, not shipped

- Default: the turning third-person camera, exactly as before CAM1 (drag on the right turns it).
- Settings > Camera: Turning (default) or High (CAM1's camera); "High camera angle" row only shows for High. Kept per phone (`rally-cammode`). `?cam=old|turn|high|45|50|55` for testing.
- See-through: trees only. CAM1's hole through towers, walls and rocks is removed (render/camhole.js deleted, HOLE config gone).
- Work with both cameras now: hold the minimap to look (slides back on release; tray open = "Attack here!"), dead: teammates' faces and the stick moving the camera, faction rings on every champion.
- Check: store/r_CAM2.mjs; r_CAM1 runs with ?cam=high.
