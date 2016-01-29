//java script

const targz = require('targz')

const targzOptions = {
    src: 'Wwise_Template_Migration.tar.gz',
    dest: 'outputfiles'
}


targz.decompress(targzOptions, () => {
    console.log('done? hopefully')
})
