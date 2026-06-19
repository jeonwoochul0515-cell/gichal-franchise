# 기찰반점 가맹본부 홈페이지

중식 무한리필 뷔페 브랜드 **기찰반점**(가맹본부: 바른미식)의 가맹점 모집용 공식 홈페이지입니다.
React + Vite + TypeScript로 제작했으며 Cloudflare Pages 정적 배포를 전제로 합니다.

## 기술 스택
- React 18 + TypeScript
- Vite 6
- Leaflet (OpenStreetMap) — 매장 지도, API 키 불필요

## 로컬 실행
```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 페이지 구성 (가맹모집 동선)
1. **Hero** — 배경 영상 + 슬로건 + 가맹문의 CTA
2. **브랜드 강점** — 자체 제조공장 / 듀얼 수익구조 / 시그니처 / 검증된 집객
3. **시그니처 메뉴** — 차별화 메뉴 갤러리
4. **듀얼 운영 모델** — 런치 식사뷔페 / 디너 주점뷔페
5. **창업 비용** — 가맹금·시설비 항목 및 총 투자비 (정보공개서 근거)
6. **가맹 절차** — 문의부터 오픈까지 약 45일 타임라인
7. **본사 지원** — 교육·입지·슈퍼바이징·광고 분담
8. **매장 안내** — Leaflet 지도 + 매장 리스트
9. **SNS** — 인스타그램 임베드
10. **가맹문의** — 문의 폼 + 전화
11. **Footer** — 가맹본부 법적 정보

## 수정 포인트
| 항목 | 파일 |
|---|---|
| 브랜드/본사 정보, 강점, 메뉴, 비용, 절차 | `src/data/content.ts` |
| 매장 목록·좌표 | `src/data/stores.ts` |
| 인스타그램 게시물 URL 3개 | `src/data/instagram.ts` |
| 배경 영상·포스터 | `public/media/hero.mp4`, `hero-poster.jpg` |
| 로고 | `src/assets/logo.jpg` |

> ⚠️ **매장 좌표 검수 필요**: `stores.ts`의 김해점·신평점 좌표는 주소 기반 근사값입니다.
> 정확한 주소/좌표로 업데이트하세요.

## Cloudflare Pages 배포
1. 이 폴더를 GitHub 저장소에 push
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → GitHub 연결
3. 빌드 설정
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Save and Deploy

## 가맹문의 폼
**Web3Forms**로 제출 시 cs92@naver.com에 메일이 발송됩니다. (백엔드 불필요)
- 액세스 키는 `src/components/Inquiry.tsx`의 `WEB3FORMS_KEY` 상수에 있습니다.
- 이 키는 공개돼도 안전합니다(해당 키로는 등록된 cs92@naver.com로만 발송됨).
- 받는 주소를 바꾸려면 https://web3forms.com 에서 새 키를 발급해 교체하세요.
