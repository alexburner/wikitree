'use strict';

/**
 * Merge module
 */

var merge = {};

/**
 * Merge sets of nodes and links by their IDs
 * set = { nodes, links }
 */
merge.nodesAndLinks = function (sets) {

	// let's keep this O(mn)
	var nodesById = {};
	var linksById = {};

	/**
	 * Add each set's content
	 */

	sets.forEach(function (set) {

		// add set nodes (skip if old dupe)
		set.nodes.forEach(function (node) {
			var dupe = nodesById[node.id];
			if (dupe && dupe.updated.at < node.updated.at) {
				// there's a fresher node, skip
				return;
			}
			nodesById[node.id] = node;
		});

		// add set links (skip if old dupe)
		set.links.forEach(function (link) {
			var dupe = linksById[link.id];
			if (dupe && dupe.updated.at < link.updated.at) {
				// there's a fresher link, skip
				return;
			}
			linksById[link.id] = link;
		});

	});

	/**
	 * Distill node & link arrays
	 */

	var nodes = [];
	var links = [];

	Object.keys(nodesById).forEach(function (id) {
		nodes.push(nodesById[id]);
	});

	Object.keys(linksById).forEach(function (id) {
		links.push(linksById[id]);
	});

	return {
		nodes: nodes,
		links: links
	}

};

module.exports = merge;