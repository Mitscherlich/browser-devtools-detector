import { EventEmitter } from './event'

const DEFAULT_TOLERABLE_THRESHOLD = 100

export interface IDevtoolsDetectorOptions {
  threshold?: number
}

export class DevtoolsDetector extends EventEmitter {
  private _isOpen: boolean = false
  private _detectLoopDelay: number = 500
  private _detectLoopStoped: boolean = true
  private _timer!: number

  constructor(private options: IDevtoolsDetectorOptions = {}) {
    super()
  }

  launch() {
    if (this._detectLoopDelay <= 0) {
      this.setDetectDelay(500)
    }
    if (this._detectLoopStoped) {
      this._detectLoopStoped = false
    }
    this._detectLoop()
    return this
  }

  stop() {
    if (!this._detectLoopStoped) {
      this._detectLoopStoped = true
      clearTimeout(this._timer)
    }
    return this
  }

  setDetectDelay(delay: number) {
    this._detectLoopDelay = delay
  }

  get isLaunch() {
    return this._detectLoopStoped
  }

  async getDevtoolsDetail() {
    const { threshold = DEFAULT_TOLERABLE_THRESHOLD } = this.options
    const timestamp = now()
    await (function () {}).constructor('debugger')()
    const isOpen = now() - timestamp > threshold
    return { isOpen }
  }

  async _detectLoop() {
    const detail = await this.getDevtoolsDetail()
    if (detail.isOpen !== this._isOpen) {
      this._isOpen = detail.isOpen
      this.emit('change', detail.isOpen, detail)
    }
    if (this._detectLoopDelay > 0) {
      this._timer = setTimeout(() => this._detectLoop(), this._detectLoopDelay)
    } else {
      this.stop()
    }
  }
}

function now() {
  return performance ? performance.now() : Date.now()
}
