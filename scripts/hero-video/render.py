import sys, os, base64
from playwright.sync_api import sync_playwright

out = sys.argv[1]
frames = int(sys.argv[2])
only = [float(x) for x in sys.argv[3].split(',')] if len(sys.argv) > 3 else None
os.makedirs(out, exist_ok=True)
html = 'file://' + os.path.abspath(os.path.join(os.path.dirname(__file__), 'scene.html'))

with sync_playwright() as p:
    b = p.chromium.launch(args=['--use-gl=swiftshader', '--enable-gpu-rasterization'])
    pg = b.new_page(viewport={'width': 1920, 'height': 1080}, device_scale_factor=1)
    pg.goto(html)
    pg.wait_for_function('window.ready === true')
    ts = only if only else [i / (frames - 1) for i in range(frames)]
    for i, t in enumerate(ts):
        data = pg.evaluate(f"(()=>{{render({t}); return document.getElementById('c').toDataURL('image/png');}})()")
        with open(os.path.join(out, f'f{i:04d}.png'), 'wb') as f:
            f.write(base64.b64decode(data.split(',')[1]))
    b.close()
