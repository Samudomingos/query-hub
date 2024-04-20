import { WatchedList } from './watched-list'

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('watched list', () => {
  it('should be able to create a watched list with initial items', () => {
    const watchedList = new NumberWatchedList([10, 20, 30])

    expect(watchedList.currentItems).toHaveLength(3)
  })

  it('should be able to add new items to the list', () => {
    const watchedList = new NumberWatchedList([10, 20, 30])

    watchedList.add(4)

    expect(watchedList.currentItems).toHaveLength(4)
    expect(watchedList.getNewItems()).toEqual([4])
  })

  it('should be able to remove items from the list', () => {
    const watchedList = new NumberWatchedList([10, 20, 30])

    watchedList.remove(20)

    expect(watchedList.currentItems).toHaveLength(2)
    expect(watchedList.getRemovedItems()).toEqual([20])
  })

  it('should be able to add an item even if it was removed before', () => {
    const watchedList = new NumberWatchedList([10, 20, 30])

    watchedList.remove(20)
    watchedList.add(20)

    expect(watchedList.currentItems).toHaveLength(3)
    expect(watchedList.getRemovedItems()).toEqual([])
    expect(watchedList.getNewItems()).toEqual([])
  })

  it('should be able to remove an item even if it was added before', () => {
    const watchedList = new NumberWatchedList([10, 20, 30])

    watchedList.add(40)
    watchedList.remove(40)

    expect(watchedList.currentItems).toHaveLength(3)
    expect(watchedList.getRemovedItems()).toEqual([])
    expect(watchedList.getNewItems()).toEqual([])
  })

  it('should be able to update watched list items', () => {
    const watchedList = new NumberWatchedList([1, 2, 3])

    watchedList.update([1, 3, 5])

    expect(watchedList.getRemovedItems()).toEqual([2])
    expect(watchedList.getNewItems()).toEqual([5])
  })
})
