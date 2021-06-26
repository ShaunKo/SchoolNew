export const PHOTOTYPE = {
    IDCARDFRONT : 'idCardFront',
    IDCARDBACK : 'idCardBack',
    INSURANCECARD : 'insuranceCard',
    STUDENTCARD : 'studentCard',
}


export const PHOTOCHECK = {
    WITHOUTAPPLY: 'withoutApply', // 無上傳圖片且無做確認 
    WITHOUTCHECK: 'withoutCheck', // 上傳圖片且無做確認 （不顯示上傳圖片按鈕）
    ERROR: 'error', // 審核時敗
    SUCCESS: 'success', // 審核成功 （不顯示上傳圖片按鈕）
}

export const REVIEW = {
    CHECK: '審核中',
    SUCCESS: '審核成功',
    ERROR: '審核失敗',
}