# Lesson 06: src/tools/ImageTools.jsx - Image Tools (20+ Tools)

## Tools Included

| Tool | Kya karta hai |
|------|---------------|
| ImageCompressor | Compress images client-side |
| ImageResizer | Resize dimensions |
| ImageCropper | Crop with cropper.js |
| ImageFormatConverter | PNG ↔ JPG ↔ WebP ↔ BMP |
| ImageToBase64 | Image → Base64 string |
| ImageToAscii | Image → ASCII art |
| ImageColorExtractor | Extract dominant colors |
| ImageMetadataViewer | EXIF data |
| WatermarkAdder | Add watermark text |
| BackgroundRemover | Remove background |
| ImageMerger | Merge multiple images |
| ImageSplitter | Split image into grid |
| QRCodeGenerator | Image → QR code |
| ScreenshotTool | Capture page section |

## Key Libraries

```js
import imageCompression from 'browser-image-compression';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
```

## Common Pattern

```jsx
export function ImageCompressor() {
    const [original, setOriginal] = useState(null);
    const [compressed, setCompressed] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCompress = async (file) => {
        setLoading(true);
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1024 };
        const result = await imageCompression(file, options);
        setCompressed(result);
        setLoading(false);
    };

    return (
        <ToolWrapper title="Image Compressor" icon={Image}>
            <input type="file" accept="image/*" onChange={e => setOriginal(e.target.files[0])} />
            {original && <img src={URL.createObjectURL(original)} />}
            <button onClick={() => handleCompress(original)}>Compress</button>
            {compressed && <a href={URL.createObjectURL(compressed)} download>Download</a>}
        </ToolWrapper>
    );
}
```

## Interview Questions

1. **Q: Client-side image compression kaise kaam karta hai?**
   A: Canvas API se image draw karta hai, phir quality/dimension reduce karke new blob banata hai. Koi server call nahi hota.

2. **Q: `URL.createObjectURL()` kya hai?**
   A: Browser API jo file/blob se temporary URL banata hai. `<img>` mein direct use kar sakte ho.

## Revision Notes

- 20+ image tools
- All client-side processing (no server)
- Libraries: browser-image-compression, cropperjs, html2canvas
- File input → processing → download