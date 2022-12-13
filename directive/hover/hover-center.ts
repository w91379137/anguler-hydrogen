import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

export const HoverDefaultKey = 'Default'

class HoverRecord {
    isShow = false
    enterTime = -1
    leaveTime = -1
}

class HoverManager {

    private recordDict: { [id: string]: HoverRecord; } = { }
    isShowChange$ = new Subject<string>()

    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

    private getRecord(key: string): HoverRecord {
        let result = this.recordDict[key]
        if (!result) {
            result = new HoverRecord()
            this.recordDict[key] = result
        }
        return result
    }

    moveEnter(key: string = HoverDefaultKey) {
        this.getRecord(key).enterTime = new Date().getTime()
        this.updateIsShow(key)
        // console.log(`moveEnter ${key}`)
    }

    moveLeave(key: string = HoverDefaultKey) {
        this.getRecord(key).leaveTime = new Date().getTime()
        setTimeout(() => {
            this.updateIsShow(key)
        }, 100)
        // console.log(`moveLeave ${key}`)
    }

    private updateIsShow(key: string = HoverDefaultKey) {
        let record = this.getRecord(key)
        record.isShow = record.enterTime >= record.leaveTime
        // console.log(`updateIsShow ${key} ${record.isShow}`)
        this.isShowChange$.next(key)
    }

    isShow(key: string = HoverDefaultKey) {
        return this.getRecord(key).isShow
    }
}

export const HoverCenter = new HoverManager()

// HoverCenter.isShow.bind(HoverCenter)
export const HoverIsShow = (key?: string) => HoverCenter.isShow(key)

// rxjs 範例
// HoverCenter.isShowChange$
// .pipe(tap(value => console.log(`顯示改變,${value},${HoverIsShow(value)}`)))
// .pipe(filter(value => value === HoverDefaultKey))
// .pipe(tap(value => console.log(`顯示改變,${value},${HoverIsShow(value)}`)))
// .subscribe()
