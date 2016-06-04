class FirstDamGate {
  constructor( fps ) {
    this.opened = true
    this.fps = fps;
    this.frameTime = 1000 / fps;
  }

  execute( f ) {
    if ( ! this.opened ) return
    f()
    this.close()
    setTimeout(this.open.bind(this), this.frameTime)
  }

  open() {
    this.opened = true
  }

  close() {
    this.opened = false
  }
}

class LastDamGate {
  constructor( fps ) {
    this.opened = true
    this.fps = fps;
    this.frameTime = 1000 / fps;
    this.threadCount = 0
  }

  execute( f ) {
    if ( this.threadCount > 0 ) {
      this.close()
    }
    this.threadCount++
    setTimeout(function(){
      if ( this.opened ) {
        f()
      }
      this.threadCount--
      if ( this.threadCount <= 1 ) {
        this.open()
      }
    }.bind(this), this.frameTime)
  }

  open() {
    this.opened = true
  }

  close() {
    this.opened = false
  }
}

module.exports.FirstDamGate = FirstDamGate
module.exports.LastDamGate  = LastDamGate
