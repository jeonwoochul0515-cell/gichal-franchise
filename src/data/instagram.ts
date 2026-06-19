// 인스타그램 노출 설정 — Behold 위젯(자동 최신글) 우선, 없으면 수동 URL, 둘 다 없으면 프로필 폴백

// [1순위] Behold.so 피드 ID — 입력 시 새 게시물이 올라오면 항상 최신글 자동 반영
// 발급: https://behold.so 가입 → @gi_chal 연결 → Feed 생성 → Feed ID 복사
export const beholdFeedId = ''

// 최신 몇 개를 보여줄지 (위젯/수동 공통)
export const instagramCount = 3

// [2순위] 수동 oEmbed용 게시물 URL (자동 갱신 안 됨 — 새 글마다 교체+재배포 필요)
export const instagramPosts: string[] = [
  'https://www.instagram.com/reel/DZmSfF6zVWb/',
  'https://www.instagram.com/reel/DZd3rFizYxZ/',
  'https://www.instagram.com/reel/DZcKsnMz_OK/',
]
