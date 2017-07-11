/**
 * @flow
 * @relayHash dd9bd111e5acc38ac55bf45c2353b8d7
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type billQueryResponse = {|
  +viewer: ?{|
    +bill: ?{| |};
  |};
|};
*/


/*
query billQuery(
  $billId: ID!
) {
  viewer {
    bill(id: $billId) {
      ...BillScene_bill
      id
    }
    id
  }
}

fragment BillScene_bill on Bill {
  ...Content_bill
}

fragment Content_bill on Bill {
  documentNumber
  title
  summary
  sponsorName
  hearing {
    date
    id
  }
  committee {
    name
    id
  }
  chamber {
    name
    id
  }
  ...Actions_bill
}

fragment Actions_bill on Bill {
  detailsUrl
  fullTextUrl
  witnessSlipUrl
  witnessSlipResultUrl
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "billId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "billQuery",
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
                "name": "id",
                "variableName": "billId",
                "type": "ID!"
              }
            ],
            "concreteType": "Bill",
            "name": "bill",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "BillScene_bill",
                "args": null
              }
            ],
            "storageKey": null
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
  "name": "billQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "billId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "billQuery",
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
                "name": "id",
                "variableName": "billId",
                "type": "ID!"
              }
            ],
            "concreteType": "Bill",
            "name": "bill",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Chamber",
                "name": "chamber",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
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
                "name": "documentNumber",
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
                "name": "sponsorName",
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
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Committee",
                "name": "committee",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
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
                "name": "title",
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
                "name": "witnessSlipResultUrl",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query billQuery(\n  $billId: ID!\n) {\n  viewer {\n    bill(id: $billId) {\n      ...BillScene_bill\n      id\n    }\n    id\n  }\n}\n\nfragment BillScene_bill on Bill {\n  ...Content_bill\n}\n\nfragment Content_bill on Bill {\n  documentNumber\n  title\n  summary\n  sponsorName\n  hearing {\n    date\n    id\n  }\n  committee {\n    name\n    id\n  }\n  chamber {\n    name\n    id\n  }\n  ...Actions_bill\n}\n\nfragment Actions_bill on Bill {\n  detailsUrl\n  fullTextUrl\n  witnessSlipUrl\n  witnessSlipResultUrl\n}\n"
};

module.exports = batch;
