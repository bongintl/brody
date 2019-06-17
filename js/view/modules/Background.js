var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var { baseline } = require('../utils/metrics');
var { responsive, mediaQueries } = require('../utils/breakpoints');
var merge = require('lodash/merge');

var Video = require('./Video');
var { BackgroundImage } = require('./Image');

var margin = responsive([ 2 ]);

var styles = j2c.attach({
    '.background': merge(
        {
            width: '100%',
            position: 'relative',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden'
        },
        {
            '&:not(:first-child)': mediaQueries( [ baseline, margin ], ( b, m ) => ({ 'paddingTop': b * m + 'px' }) )
        }
    ),
    '.backgroundVideo': {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        height: '100%',
        pointerEvents: 'none'
    }
})

module.exports = {
    
    view: ({
        attrs: { color, file, fixed, height },
        children
    }) => {
        
        var minHeight;
        
        switch ( height ) {
            
            case 'content':
                minHeight = 'auto';
                break;
                
            case 'file':
                minHeight = ( file.h / file.w ) * 100 + 'vw';
                break;
                
            case 'viewport':
                minHeight = '100vh';
                break;
            
        }
        
        var style = {
            minHeight,
            backgroundColor: color
        }
        
        var child;
        
        if ( !file ) {
            
            child = '';
            
        } else if ( file.type === 'video' ) {
            
            child = <Video file={ file } fit={ 'cover' }/>
            
        } else if ( file.type === 'image' ) {
            
            child = <BackgroundImage file={ file } fixed={ fixed } fit={ 'cover' }/>
            
        }
        
        return (
            <div class={ styles.background } style={ style }>
                { child }
                { children }
            </div>
        )
        
    }
    
}
