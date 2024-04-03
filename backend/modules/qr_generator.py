import base64
import os
import qrcode
import qrcode.image.svg as svg


def make_qr(text, ext):
    if not os.path.exists('imgs'):
        os.mkdir('imgs')
    if ext == '.svg':
        factory = svg.SvgPathImage
        img = qrcode.make(text, image_factory=factory)
        img.save('imgs/qr.svg')
        with open('imgs/qr.svg', 'rb') as f:
            img_data = f.read()
            img_str = base64.b64encode(img_data)
        os.remove('imgs/qr.svg')
    else:
        img = qrcode.make(text)
        img.save('imgs/qr.png')
        with open('imgs/qr.png', 'rb') as f:
            img_data = f.read()
            img_str = base64.b64encode(img_data)
        os.remove('imgs/qr.png')
    return img_str.decode('utf-8')
