import AQuickNote from '.';

export function getNoteString() {
    const currentDate = new Date();
    return AQuickNote.settings.noteString
        .replace('%current_date%', currentDate.toLocaleString())
}