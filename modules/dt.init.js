var controller = require( './controller.js' );

/**
 * @class mw.dt
 * @singleton
 */
mw.dt = {};

mw.dt.initState = {};
mw.dt.init = function ( $container ) {
	if ( $container.is( '#mw-content-text' ) || $container.find( '#mw-content-text' ).length ) {
		// eslint-disable-next-line no-jquery/no-global-selector
		controller.init( $( '#mw-content-text' ), mw.dt.initState );
		// Reset for next init
		mw.dt.initState = {};
	}
};

if ( new mw.Uri().query.dtdebug ) {
	mw.loader.load( 'ext.discussionTools.debug' );
} else if ( mw.config.get( 'wgIsProbablyEditable' ) ) {
	// Don't use an anonymous function, because ReplyWidget needs to be able to remove this handler
	mw.hook( 'wikipage.content' ).add( mw.dt.init );
}

module.exports = {
	controller: require( './controller.js' ),
	Parser: require( './Parser.js' ),
	modifier: require( './modifier.js' ),
	ThreadItem: require( './ThreadItem.js' ),
	HeadingItem: require( './HeadingItem.js' ),
	CommentItem: require( './CommentItem.js' ),
	utils: require( './utils.js' ),
	logger: require( './logger.js' ),
	config: require( './config.json' )
};
