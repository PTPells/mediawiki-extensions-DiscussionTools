var
	utils = require( './utils.js' ),
	parser = require( 'ext.discussionTools.parser' ),
	modifier = require( 'ext.discussionTools.modifier' );

QUnit.module( 'mw.dt.modifier', utils.newEnvironment() );

QUnit.test( '#addListItem', function ( assert ) {
	var i, j, cases, actualHtml, expectedHtml, comments, node, fixture;

	cases = [
		{
			name: 'plwiki oldparser',
			dom: mw.template.get( 'test.DiscussionTools', 'oldparser/pl-55171451.html' ).render(),
			expected: mw.template.get( 'test.DiscussionTools', 'oldparser/pl-55171451-modified.html' ).render(),
			config: require( './data/plwiki-config.json' ),
			data: require( './data/plwiki-data.json' )
		},
		{
			name: 'plwiki parsoid',
			dom: mw.template.get( 'test.DiscussionTools', 'parsoid/pl-55171451.html' ).render(),
			expected: mw.template.get( 'test.DiscussionTools', 'parsoid/pl-55171451-modified.html' ).render(),
			config: require( './data/plwiki-config.json' ),
			data: require( './data/plwiki-data.json' )
		},
		{
			name: 'enwiki oldparser',
			dom: mw.template.get( 'test.DiscussionTools', 'oldparser/en-913983958.html' ).render(),
			expected: mw.template.get( 'test.DiscussionTools', 'oldparser/en-913983958-modified.html' ).render(),
			config: require( './data/enwiki-config.json' ),
			data: require( './data/enwiki-data.json' )
		},
		{
			name: 'enwiki parsoid',
			dom: mw.template.get( 'test.DiscussionTools', 'parsoid/en-913983958.html' ).render(),
			expected: mw.template.get( 'test.DiscussionTools', 'parsoid/en-913983958-modified.html' ).render(),
			config: require( './data/enwiki-config.json' ),
			data: require( './data/enwiki-data.json' )
		}
	];

	fixture = document.getElementById( 'qunit-fixture' );

	for ( i = 0; i < cases.length; i++ ) {
		utils.overrideMwConfig( cases[ i ].config );
		utils.overrideParserData( cases[ i ].data );

		$( fixture ).empty().append( cases[ i ].expected );
		expectedHtml = fixture.innerHTML;

		$( fixture ).empty().append( cases[ i ].dom.clone() );
		comments = parser.getComments( fixture );
		parser.groupThreads( comments );

		// Add a reply to every comment. Note that this inserts *all* of the replies, unlike the real
		// thing, which only deals with one at a time. This isn't ideal but resetting everything after
		// every reply would be super slow.
		for ( j = 0; j < comments.length; j++ ) {
			if ( comments[ j ].type === 'heading' ) {
				continue;
			}
			node = modifier.addListItem( modifier.addListAtComment( comments[ j ] ) );
			node.textContent = 'Reply to ' + comments[ j ].id;
		}

		// Uncomment this to get updated content for the the "modified HTML" files, for copy/paste:
		// console.log( fixture.innerHTML );

		actualHtml = fixture.innerHTML.trim();

		// FIXME: The modifier occasionally generates DOM that is invalid HTML, e.g. <dl> nested inside
		// <p>. This causes the strings to not match. Parse the HTML again to get a consistent result.
		// Ideally, the modifier would not do that…
		fixture.innerHTML = actualHtml;
		actualHtml = fixture.innerHTML;

		assert.strictEqual(
			actualHtml,
			expectedHtml,
			cases[ i ].name
		);
	}
} );
