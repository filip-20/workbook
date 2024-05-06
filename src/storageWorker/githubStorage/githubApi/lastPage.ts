export default function githubApiParseLastPage(link?: string) {
  let lastPage: number | null = null;
  if (link) {
    link.split(', ').forEach(item => {
      const parts = item.split('; ');
      if (parts[1] === 'rel="last"') {
        const match = parts[0].match(/.*[?&]+page=([0-9]+)/)
        /* was positive integer parsed? */
        if (match && match[1] !== undefined && /^\d+$/.test(match[1])) {
          lastPage = parseInt(match[1]);
        }
      }
    })
  }
  if (!lastPage) {
    return 1
  } else {
    return lastPage;
  }
}