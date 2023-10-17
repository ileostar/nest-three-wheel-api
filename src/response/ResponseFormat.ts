export interface PageItem {
  totalPages?: number
  itemCount?: number
  currentPage?: number
  itemsPerPage?: number
  totalItems?: number
}

export interface ReponsePage<T> extends PageItem {
  items: T[]
}

export class ResponseData<T> {
  code: number //状态码
  msg: string //消息
  data?: T //数据内容

  constructor(code = 200, msg: string, data: T = null) {
    this.code = code
    this.msg = msg
    this.data = data
  }

  static ok<T>(data: T = null, message = 'ok'): ResponseData<T> {
    return new ResponseData(200, message, data)
  }

  static fail(message = 'fail', code = -1): ResponseData<null> {
    return new ResponseData(code, message)
  }

}
