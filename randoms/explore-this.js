let nope = 'dd';

const ooo = {
    milo: 'ddd',
    omal: function() {
        console.log(this.milo)
        return this.milo
    }
}
console.log(ooo.omal())