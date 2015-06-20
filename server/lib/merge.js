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

		// add set nodes
		set.nodes.forEach(function (node) {
			var dupe = nodesById[node.id];
			if (dupe && dupe.updated.at < node.updated.at) {
				// duplicate & older, skip
				return;
			}
			nodesById[node.id] = node;
		});

		// add set links
		set.links.forEach(function (link) {
			var dupe = linksById[link.id];
			if (dupe && dupe.updated.at < link.updated.at) {
				// duplicate & older, skip
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

	// filter out any deleted objects
	nodes = nodes.filter(function (o) { return !o.deleted });
	links = links.filter(function (o) { return !o.deleted });

	return {
		nodes: nodes,
		links: links
	}

};

module.exports = merge;
