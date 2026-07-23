# Missing Export Fixes

## Files to Edit

### 1. `src/tools/TextTools.jsx`
- [x] Add `RemoveExtraSpaces` alias for `RemoveSpaces`
- [x] Add `RemoveDuplicateLines` alias for `RemoveDuplicates`
- [x] Add `MorseCodeGenerator` alias for `MorseEncoder`
- [x] Add `MorseCodeDecoder` alias for `MorseDecoder`

### 2. `src/tools/DeveloperTools.jsx`
- [x] Add `JsBeautifier` alias for `JSBeautifier`
- [x] Add `JsMinifier` alias for `JSMinifier`
- [x] Add `UnixTimestampConverter` alias for `UnixTimestamp`
- [x] Add `CronExpressionGenerator` alias for `CronGenerator`

### 3. `src/tools/MiscTools.jsx`
- [x] Add direct exports for QR & Barcode tools (8 items)
- [x] Add direct exports for Password & Security tools (6 items)
- [x] Add direct exports for Date & Time tools (8 items)
- [x] Add direct exports for SEO tools (6 items)
- [x] Add direct exports for Social Media tools (5 items)
- [x] Add direct exports for File tools (4 items)
- [x] Fix `TimeConverter` to also export as `TimeUnitConverter`
- [x] Add direct exports for Fun tools (7 items)

### 4. Rebuild and Verify
- [x] Run `npm run build`
- [x] Confirm no errors
