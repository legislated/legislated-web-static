/**
 * @flow
 * @relayHash 151b3d1d6ad3c44f0b9e127ed1df17fd
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type SearchSceneQueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query SearchSceneQuery(
  $first: Int!
  $startDate: Time!
  $endDate: Time!
  $query: String!
) {
  viewer {
    ...SearchScene_viewer
    id
  }
}

fragment SearchScene_viewer on Viewer {
  bills(first: $first, from: $startDate, to: $endDate, query: $query) {
    edges {
      node {
        id
        __typename
      }
      cursor
    }
    ...BillsList_bills
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}

fragment BillsList_bills on BillSearchConnection {
  count
  edges {
    node {
      id
      ...BillCell_bill
    }
  }
  pageInfo {
    hasNextPage
  }
}

fragment BillCell_bill on Bill {
  id
  documentNumber
  title
  summary
  witnessSlipUrl
  detailsUrl
  fullTextUrl
  hearing {
    date
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "first",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "startDate",
        "type": "Time!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "endDate",
        "type": "Time!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "query",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchSceneQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "SearchScene_viewer",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "SearchSceneQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "first",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "startDate",
        "type": "Time!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "endDate",
        "type": "Time!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "query",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "SearchSceneQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "first",
                "type": "Int"
              },
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
            "name": "bills",
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
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "documentNumber",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "summary",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "witnessSlipUrl",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "detailsUrl",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "fullTextUrl",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Hearing",
                        "name": "hearing",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "id",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "count",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasPreviousPage",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "startCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "first",
                "type": "Int"
              },
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
            "handle": "connection",
            "name": "bills",
            "key": "SearchScene_bills",
            "filters": [
              "from",
              "to",
              "query"
            ]
          },
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
    ]
  },
  "text": "query SearchSceneQuery(\n  $first: Int!\n  $startDate: Time!\n  $endDate: Time!\n  $query: String!\n) {\n  viewer {\n    ...SearchScene_viewer\n    id\n  }\n}\n\nfragment SearchScene_viewer on Viewer {\n  bills(first: $first, from: $startDate, to: $endDate, query: $query) {\n    edges {\n      node {\n        id\n        __typename\n      }\n      cursor\n    }\n    ...BillsList_bills\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment BillsList_bills on BillSearchConnection {\n  count\n  edges {\n    node {\n      id\n      ...BillCell_bill\n    }\n  }\n  pageInfo {\n    hasNextPage\n  }\n}\n\nfragment BillCell_bill on Bill {\n  id\n  documentNumber\n  title\n  summary\n  witnessSlipUrl\n  detailsUrl\n  fullTextUrl\n  hearing {\n    date\n    id\n  }\n}\n"
};

module.exports = batch;
