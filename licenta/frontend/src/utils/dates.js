export function transformDate(dateString) {
    return dateString?.replaceAll('-', '/')?.replaceAll('T', ' ')?.split('.')?.[0]
}
