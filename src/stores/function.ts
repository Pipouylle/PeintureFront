export function findAllIndexes<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): number[] {
    const indexes: number[] = [];
    array.forEach((value, index) => {
        if (predicate(value, index, array)) {
            indexes.push(index);
        }
    });
    return indexes;
}