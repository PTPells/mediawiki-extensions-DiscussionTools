/**
 * DiscussionTools-specific target, inheriting from the stand-alone target
 *
 * @class
 * @extends ve.init.mw.Target
 *
 * @param {Object} config Configuration options
 */
function CommentTarget( config ) {
	config = config || {};

	// Parent constructor
	CommentTarget.super.call( this, ve.extendObject( {
		toolbarConfig: { actions: true, $overlay: true, position: 'bottom' }
	}, config ) );
}

/* Inheritance */

OO.inheritClass( CommentTarget, ve.init.mw.Target );

/* Static methods */

CommentTarget.static.name = 'discussionTools';

CommentTarget.static.modes = [ 'visual', 'source' ];

CommentTarget.static.toolbarGroups = [
	{
		name: 'style',
		type: 'list',
		icon: 'textStyle',
		title: OO.ui.deferMsg( 'visualeditor-toolbar-style-tooltip' ),
		include: [ { group: 'textStyle' }, 'language', 'clear' ],
		forceExpand: [ 'bold', 'italic' ],
		demote: [ 'strikethrough', 'code', 'underline', 'language', 'big', 'small', 'clear' ]
	},
	{
		name: 'link',
		include: [ 'link' ]
	}
	// Mention?
];

// Allow pasting links
CommentTarget.static.importRules = ve.copy( CommentTarget.static.importRules );
CommentTarget.static.importRules.external.blacklist[ 'link/mwExternal' ] = false;

// TODO Add edit switcher actionGroup

CommentTarget.prototype.attachToolbar = function () {
	this.$element.append( this.getToolbar().$element );
};

/* Registration */

ve.init.mw.targetFactory.register( CommentTarget );

module.exports = CommentTarget;
