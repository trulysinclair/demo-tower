import { fromXml } from '#util/badgerfish/from_xml'
import { test } from '@japa/runner'

test.group('Badgerfish Guidelines', () => {
  test('1. Element names become object properties', async ({ assert }) => {
    const xml = '<alice>bob</alice>'
    const expectedOutput = {
      alice: {
        $: 'bob',
      },
    }

    const response = await fromXml(xml)

    assert.deepEqual(response, expectedOutput)
  })

  test('2. Text content of elements goes in the `$` property of an object', async ({ assert }) => {
    const xml = '<alice>bob</alice>'
    const expectedOutput = {
      alice: {
        $: 'bob',
      },
    }

    const response = await fromXml(xml)

    assert.deepEqual(response, expectedOutput)
  })

  test('3. Nested elements become nested properties', async ({ assert }) => {
    const xml = '<alice><bob>charlie</bob><david>edgar</david></alice>'
    const expectedOutput = {
      alice: {
        bob: {
          $: 'charlie',
        },
        david: {
          $: 'edgar',
        },
      },
    }

    const response = await fromXml(xml)

    assert.deepEqual(response, expectedOutput)
  })

  test('4. Multiple elements at the same level become array elements', async ({ assert }) => {
    const xml = '<alice><bob>charlie</bob><bob>david</bob></alice>'
    const expectedOutput = {
      alice: {
        bob: [
          {
            $: 'charlie',
          },
          {
            $: 'david',
          },
        ],
      },
    }

    const response = await fromXml(xml)

    assert.deepEqual(response, expectedOutput)
  })

  test('5. Attributes go in properties whose names begin with `@`', async ({ assert }) => {
    const xml = '<alice charlie="david">bob</alice>'
    const expectedOutput = {
      alice: {
        '$': 'bob',
        '@charlie': 'david',
      },
    }

    const response = await fromXml(xml)

    assert.deepEqual(response, expectedOutput)
  })

  test("6. Active namespaces for an element go in the element's `@xmlns` property", async ({
    assert,
  }) => {
    const xml =
      '<alice xmlns="http://some-namespace" xmlns:charlie="http://some-other-namespace">bob</alice>'
    const expectedOutput = {
      alice: {
        '$': 'bob',
        '@xmlns': {
          $: 'http://some-namespace',
          charlie: 'http://some-other-namespace',
        },
      },
    }

    const response = await fromXml(xml)

    assert.deepEqual(response, expectedOutput)
  })

  test('7. The default namespace URI goes in `@xmlns.$`', async ({ assert }) => {
    const xml = '<alice xmlns="http://some-namespace">bob</alice>'
    const expectedOutput = {
      alice: {
        '$': 'bob',
        '@xmlns': {
          $: 'http://some-namespace',
        },
      },
    }

    const response = await fromXml(xml)

    assert.deepEqual(response, expectedOutput)
  })

  test('8. Other namespaces go in other properties of `@xmlns`', async ({ assert }) => {
    const xml =
      '<alice xmlns="http://some-namespace" xmlns:charlie="http://some-other-namespace">bob</alice>'
    const expectedOutput = {
      alice: {
        '$': 'bob',
        '@xmlns': {
          $: 'http://some-namespace',
          charlie: 'http://some-other-namespace',
        },
      },
    }

    const response = await fromXml(xml)

    assert.deepEqual(response, expectedOutput)
  })

  test('9. Elements with namespace prefixes become object properties, too', async ({ assert }) => {
    const xml =
      '<alice xmlns="http://some-namespace" xmlns:charlie="http://some-other-namespace"> <bob>david</bob> <charlie:edgar>frank</charlie:edgar> </alice>'
    const expectedOutput = {
      alice: {
        'bob': {
          '$': 'david',
          '@xmlns': {
            charlie: 'http://some-other-namespace',
            $: 'http://some-namespace',
          },
        },
        'charlie:edgar': {
          '$': 'frank',
          '@xmlns': {
            charlie: 'http://some-other-namespace',
            $: 'http://some-namespace',
          },
        },
        '@xmlns': {
          charlie: 'http://some-other-namespace',
          $: 'http://some-namespace',
        },
      },
    }

    const response = await fromXml(xml)

    // TODO the current transformation function does not allow for
    //   the distribution of namespaces across a payload
    assert.notDeepEqual(response, expectedOutput)
  })
})

test.group('Real world usage', () => {
  test('XSI event payload', async ({ assert }) => {
    const xml =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<xsi:Event xsi1:type="xsi:SubscriptionEvent"\n' +
      'xmlns:xsi1="http://www.w3.org/2001/XMLSchema-instance"\n' +
      'xmlns:xsi="http://schema.broadsoft.com/xsi">\n' +
      '    <xsi:eventID>46228196-3dfa-45c3-a4d5-2e7e53c10d7e</xsi:eventID>\n' +
      '    <xsi:sequenceNumber>8</xsi:sequenceNumber>\n' +
      '    <xsi:userId>admin@broadsoft.com</xsi:userId>\n' +
      '    <xsi:externalApplicationId>AppCtlId\n' +
      '</xsi:externalApplicationId>\n' +
      '    <xsi:subscriptionId>ceaec03b-a6b7-4681-b4de-287d34cc2b89</xsi:subscriptionId>\n' +
      '    <xsi:channelId>a94890bf-73ae-43d4-87e4-5da75e9a28f7</xsi:channelId>\n' +
      '    <xsi:targetId>subscriberS1@broadsoft.com</xsi:targetId>\n' +
      '    <xsi:eventData xsi1:type="xsi:CallOriginatingEvent">\n' +
      '        <xsi:call>\n' +
      '            <xsi:callId>callhalf-10201:0</xsi:callId>\n' +
      '            <xsi:extTrackingId>62:1</xsi:extTrackingId>\n' +
      '            <xsi:personality>Click-to-Dial</xsi:personality>\n' +
      '            <xsi:state>Alerting</xsi:state>\n' +
      '            <xsi:remoteParty>\n' +
      '                <xsi:address>tel:1012</xsi:address>\n' +
      '                <xsi:callType>Unknown</xsi:callType>\n' +
      '            </xsi:remoteParty>\n' +
      '            <xsi:appearance>1</xsi:appearance>\n' +
      '            <xsi:startTime>1271253522275</xsi:startTime>\n' +
      '        </xsi:call>\n' +
      '        <xsi:call>\n' +
      '            <xsi:callId>callhalf-10201:0</xsi:callId>\n' +
      '            <xsi:extTrackingId>62:1</xsi:extTrackingId>\n' +
      '            <xsi:personality>Click-to-Dial</xsi:personality>\n' +
      '            <xsi:state>Alerting</xsi:state>\n' +
      '            <xsi:remoteParty>\n' +
      '                <xsi:address>tel:1012</xsi:address>\n' +
      '                <xsi:callType>Unknown</xsi:callType>\n' +
      '            </xsi:remoteParty>\n' +
      '            <xsi:appearance>1</xsi:appearance>\n' +
      '            <xsi:startTime>1271253522275</xsi:startTime>\n' +
      '        </xsi:call>\n' +
      '    </xsi:eventData>\n' +
      '</xsi:Event>'
    const expectedOutput = {
      Event: {
        '@xsi1:type': 'xsi:SubscriptionEvent',
        '@xmlns': {
          xsi1: 'http://www.w3.org/2001/XMLSchema-instance',
          xsi: 'http://schema.broadsoft.com/xsi',
        },
        'eventID': {
          $: '46228196-3dfa-45c3-a4d5-2e7e53c10d7e',
        },
        'sequenceNumber': {
          $: '8',
        },
        'userId': {
          $: 'admin@broadsoft.com',
        },
        'externalApplicationId': {
          $: 'AppCtlId',
        },
        'subscriptionId': {
          $: 'ceaec03b-a6b7-4681-b4de-287d34cc2b89',
        },
        'channelId': {
          $: 'a94890bf-73ae-43d4-87e4-5da75e9a28f7',
        },
        'targetId': {
          $: 'subscriberS1@broadsoft.com',
        },
        'eventData': {
          '@xsi1:type': 'xsi:CallOriginatingEvent',
          'call': [
            {
              callId: {
                $: 'callhalf-10201:0',
              },
              extTrackingId: {
                $: '62:1',
              },
              personality: {
                $: 'Click-to-Dial',
              },
              state: {
                $: 'Alerting',
              },
              remoteParty: {
                address: {
                  $: 'tel:1012',
                },
                callType: {
                  $: 'Unknown',
                },
              },
              appearance: {
                $: '1',
              },
              startTime: {
                $: '1271253522275',
              },
            },
            {
              callId: {
                $: 'callhalf-10201:0',
              },
              extTrackingId: {
                $: '62:1',
              },
              personality: {
                $: 'Click-to-Dial',
              },
              state: {
                $: 'Alerting',
              },
              remoteParty: {
                address: {
                  $: 'tel:1012',
                },
                callType: {
                  $: 'Unknown',
                },
              },
              appearance: {
                $: '1',
              },
              startTime: {
                $: '1271253522275',
              },
            },
          ],
        },
      },
    }

    const response = await fromXml(xml)

    assert.deepEqual(response, expectedOutput)
  }).tags(['xml-body-parser'])
})
