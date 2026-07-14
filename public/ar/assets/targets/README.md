# 이미지 타겟 이미지 폴더

인식시킬 **타겟 이미지**(포스터/그림 등)를 여기에 넣습니다.

- 권장: 대비가 뚜렷하고 특징점 많은 이미지(`.jpg`/`.png`)
- 빌드 시 `dist/assets/targets/` 로 복사됩니다.
- `src/img-targets.ts` 의 각 항목 `image` 에 경로를 지정하세요. 예: `assets/targets/poster1.jpg`

## ⚠️ 실제 인식을 위해 추가로 필요한 것 (다음 단계)
8th Wall 엔진은 원본 이미지가 아니라 **컴파일된 타겟 데이터(`.json`)**로 인식합니다.
- 프로젝트 루트에 `image-targets/` 폴더를 만들고 `<이름>.json`(8th Wall Studio에서 생성) 을 넣은 뒤,
- `src/app.js` 에서 `XR8.XrController.configure({imageTargetData: [...]})` 로 등록해야 합니다.
- (webpack 이 `image-targets/` 를 `dist/` 로 자동 복사하도록 이미 설정돼 있습니다.)
