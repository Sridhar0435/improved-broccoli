export const UtilityFunctions = {
  isHidden: (appmenuId, appfunc, compName) => {
    if (appfunc !== undefined && appfunc !== []) {
      const val = appfunc.filter(
        (item) => item.appmenuId.toString() === appmenuId
      )
      if (val.length > 0) {
        const found = val.findIndex(
          (itemin) => itemin.compName.toLowerCase() === compName.toLowerCase()
        )
        if (
          found > -1 &&
          val[found].accessType.toLowerCase() !== 'h' &&
          val[found].accessType.toLowerCase() !== 'r'
        ) {
          return false
        } else return true
      } else return true
    }
  },
}
