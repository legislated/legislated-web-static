/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type SearchScene_viewer = {|
  +bills: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string;
      |};
    |}>;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "first",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "startDate",
      "type": "Time"
    },
    {
      "kind": "RootArgument",
      "name": "endDate",
      "type": "Time"
    },
    {
      "kind": "RootArgument",
      "name": "query",
      "type": "String"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": null,
        "direction": "forward",
        "path": [
          "bills"
        ]
      }
    ]
  },
  "name": "SearchScene_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "bills",
      "args": [
        {
          "kind": "Variable",
          "name": "from",
          "variableName": "startDate",
          "type": "Time"
        },
        {
          "kind": "Variable",
          "name": "query",
          "variableName": "query",
          "type": "String"
        },
        {
          "kind": "Variable",
          "name": "to",
          "variableName": "endDate",
          "type": "Time"
        }
      ],
      "concreteType": "BillSearchConnection",
      "name": "__SearchScene_bills_connection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "BillEdge",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "Bill",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "args": null,
                  "name": "id",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "BillsList_bills",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
