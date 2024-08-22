# SETTING_SAMPLE.md

## Default Setting

settings.json
```json
{
  "SmartInsertDate.DateFormat": [
    { "format": "YYYY-MM-DD ddd" },
    { "format": "ddd, MMM DD, YYYY" },
    { "format": "dddd, MMMMM DD, YYYY" },
    { "format": "dddd, MM DD, YYYY" },
    { "format": "ddd, DD MMM, YYYY" },
    { "format": "YYYY/MM/DD ddd" },
    { "format": "YYYY/MM/DD(ddd)" },
    { "format": "YYYYMMDD" }
  ],
  "SmartInsertDate.DateTimeFormat": [
    { "format": "YYYY-MM-DD ddd HH:mm" },
    { "format": "ddd, MMM DD, YYYY hh:mm aa" },
    { "format": "dddd, MMMMM DD, YYYY hh:mm aa" },
    { "format": "dddd, MM DD, YYYY hh:mm aa" },
    { "format": "ddd, DD MMM, YYYY HH:mm" },
    { "format": "YYYY/MM/DD ddd hh:mm:ss aa" },
    { "format": "YYYY/MM/DD(ddd) AA hh:mm:ss" },
    { "format": "YYYYMMDDHHmmss" }
  ],
  "SmartInsertDate.TimeFormat": [
    { "format": "HH:mm" },
    { "format": "hh:mm aa" },
    { "format": "AA hh:mm" },
    { "format": "HH:mm:ss" },
    { "format": "hh:mm:ss aa" },
    { "format": "AA hh:mm:ss" }
  ],
  "SmartInsertDate.CustomDayOfWeekLong": {
    "Sun": "日曜日",
    "Mon": "月曜日",
    "Tue": "火曜日",
    "Wed": "水曜日",
    "Thu": "木曜日",
    "Fri": "金曜日",
    "Sat": "土曜日"
  },
  "SmartInsertDate.CustomDayOfWeekShort": {
    "Sun": "日",
    "Mon": "月",
    "Tue": "火",
    "Wed": "水",
    "Thu": "木",
    "Fri": "金",
    "Sat": "土"
  },
  "SmartInsertDate.CustomAmPmShort": {
    "am": "午前",
    "pm": "午後"
  },
  "SmartInsertDate.CustomAmPmLong": {
    "am": "",
    "pm": ""
  },
  "SmartInsertDate.MenuDateTime": [
    {
      "label": "YYYY-MM-DD 'etc'",
      "items": [
        {
          "label": "YYYY-MM-DD",
          "items": [
            { "format": "YYYY-MM-DD" },
            { "format": "YYYY-MM-DD ddd" },
            { "format": "YYYY-MM-DD dddd" },
            {
              "separator": true
            },
            {
              "label": "'+Time 12'",
              "items": [
                { "format": "YYYY-MM-DD hh:mm aa" },
                { "format": "YYYY-MM-DD ddd hh:mm aa" },
                { "format": "YYYY-MM-DD dddd hh:mm aa" }
              ]
            },
            {
              "label": "'+Time 24'",
              "items": [
                { "format": "YYYY-MM-DD HH:mm" },
                { "format": "YYYY-MM-DD ddd HH:mm" },
                { "format": "YYYY-MM-DD dddd HH:mm" }
              ]
            }
          ]
        },
        {
          "label": "YYYY/MM/DD",
          "items": [
            { "format": "YYYY/MM/DD" },
            { "format": "YYYY/MM/DD ddd" },
            { "format": "YYYY/MM/DD dddd" },
            {
              "separator": true
            },
            {
              "label": "'+Time 12'",
              "items": [
                { "format": "YYYY/MM/DD hh:mm aa" },
                { "format": "YYYY/MM/DD ddd hh:mm aa" },
                { "format": "YYYY/MM/DD dddd hh:mm aa" }
              ]
            },
            {
              "label": "'+Time 24'",
              "items": [
                { "format": "YYYY/MM/DD HH:mm" },
                { "format": "YYYY/MM/DD ddd HH:mm" },
                { "format": "YYYY/MM/DD dddd HH:mm" }
              ]
            }
          ]
        },
        {
          "label": "YYYY.MM.DD",
          "items": [
            { "format": "YYYY.MM.DD" },
            { "format": "YYYY.MM.DD ddd" },
            { "format": "YYYY.MM.DD dddd" },
            {
              "separator": true
            },
            {
              "label": "'+Time 12'",
              "items": [
                { "format": "YYYY.MM.DD hh:mm aa" },
                { "format": "YYYY.MM.DD ddd hh:mm aa" },
                { "format": "YYYY.MM.DD dddd hh:mm aa" }
              ]
            },
            {
              "label": "'+Time 24'",
              "items": [
                { "format": "YYYY.MM.DD HH:mm" },
                { "format": "YYYY.MM.DD ddd HH:mm" },
                { "format": "YYYY.MM.DD dddd HH:mm" }
              ]
            }
          ]
        },
        {
          "label": "YYYY MM DD",
          "items": [
            { "format": "YYYY MM DD" },
            { "format": "YYYY MM DD ddd" },
            { "format": "YYYY MM DD dddd" },
            {
              "separator": true
            },
            {
              "label": "'+Time 12'",
              "items": [
                { "format": "YYYY MM DD hh:mm aa" },
                { "format": "YYYY MM DD ddd hh:mm aa" },
                { "format": "YYYY MM DD dddd hh:mm aa" }
              ]
            },
            {
              "label": "'+Time 24'",
              "items": [
                { "format": "YYYY MM DD HH:mm" },
                { "format": "YYYY MM DD ddd HH:mm" },
                { "format": "YYYY MM DD dddd HH:mm" }
              ]
            }
          ]
        },
        {
          "label": "YYYYMMDD",
          "items": [
            { "format": "YYYYMMDD" },
            { "format": "YYYYMMDD ddd" },
            { "format": "YYYYMMDD dddd" },
            {
              "separator": true
            },
            {
              "label": "'+Time 12'",
              "items": [
                { "format": "YYYYMMDD hh:mm aa" },
                { "format": "YYYYMMDD ddd hh:mm aa" },
                { "format": "YYYYMMDD dddd hh:mm aa" }
              ]
            },
            {
              "label": "'+Time 24'",
              "items": [
                { "format": "YYYYMMDD HH:mm" },
                { "format": "YYYYMMDD ddd HH:mm" },
                { "format": "YYYYMMDD dddd HH:mm" }
              ]
            }
          ]
        }
      ]
    },
    {
      "label": "MMM DD, YYYY",
      "items": [
        { "format": "MMM DD, YYYY" },
        { "format": "ddd, MMM DD, YYYY" },
        { "format": "dddd, MMM DD, YYYY" }
      ]
    },
    {
      "label": "MMMMM DD, YYYY",
      "items": [
        { "format": "MMMMM DD, YYYY" },
        { "format": "ddd, MMMMM DD, YYYY" },
        { "format": "dddd, MMMMM DD, YYYY" }
      ]
    },
    {
      "label": "MM DD, YYYY",
      "items": [
        { "format": "MM DD, YYYY" },
        { "format": "ddd, MM DD, YYYY" },
        { "format": "dddd, MM DD, YYYY" }
      ]
    },
    {
      "label": "DD MMM, YYYY",
      "items": [
        { "format": "DD MMM, YYYY" },
        { "format": "ddd, DD MMM, YYYY" },
        { "format": "dddd, DD MMM, YYYY" }
      ]
    },
    {
      "label": "'Root Commands'",
      "items": "RootCommands"
    }
  ]
}
```

## Setting for Japanese

settings.json
```json
{
  "SmartInsertDate.DateFormat": [
    { "format": "YYYY/MM/DD ddd" },
    { "format": "YYYY/MM/DD(DDD)" },
    { "format": "YYYY/MM/DD DDD曜" },
    { "format": "YYYY-MM-DD ddd" },
    { "format": "YYYY.MM.DD" },
    { "format": "YYYYMMDD" },
    { "format": "ddd, MMM DD, YYYY" },
    { "format": "dddd, MMMMM DD, YYYY" },
    { "format": "dddd, MM DD, YYYY" },
    { "format": "ddd, DD MMM, YYYY" },
    { "format": "YYYY年MM月DD日 DDDD" },
    { "format": "GE年MM月DD日 DDDD" },
    { "format": "GGE年MM月DD日 DDDD" },
    { "format": "GGGEE年MM月DD日 DDDD"  }
  ],
  "SmartInsertDate.DateTimeFormat": [
    { "format": "YYYY/MM/DD ddd HH:mm:ss" },
    { "format": "YYYY/MM/DD(ddd)HH:mm:ss" },
    { "format": "YYYY-MM-DD ddd HH:mm:ss" },
    { "format": "YYYY-MM-DD_HH-mm" },
    { "format": "YYYY.MM.DD HH:mm" },
    { "format": "ddd, MMM DD, YYYY hh:mm aa" },
    { "format": "dddd, MMMMM DD, YYYY hh:mm aa" },
    { "format": "dddd, MM DD, YYYY hh:mm aa" },
    { "format": "ddd, DD MMM, YYYY HH:mm" },
    { "format": "YYYY/MM/DD(DDD) HH:mm" },
    { "format": "YYYY年MM月DD日 DDDD AAAhh時mm分"  }
  ],
  "SmartInsertDate.TimeFormat": [
    { "format": "HH:mm" },
    { "format": "hh:mm aa" },
    { "format": "AA hh:mm" },
    { "format": "HH:mm:ss" },
    { "format": "hh:mm:ss aa" },
    { "format": "AA hh:mm:ss" },
    { "format": "AAAhh時mm分ss秒" },
  ],
  "SmartInsertDate.MenuDateTime": [
    {
      "label": "YYYY-MM-DD 'etc'",
      "items": [
        {
          "label": "YYYY-MM-DD",
          "items": [
            { "format": "YYYY-MM-DD" },
            { "format": "YYYY-MM-DD ddd" },
            { "format": "YYYY-MM-DD dddd" },
            {
              "label": "Japanese",
              "separator": true
            },
            { "format": "YYYY-MM-DD(DDD)" },
            { "format": "YYYY-MM-DD DDD曜" },
            { "format": "YYYY-MM-DD DDDD" },
            {
              "separator": true
            },
            {
              "label": "'+Time 12'",
              "items": [
                { "format": "YYYY-MM-DD hh:mm aa" },
                { "format": "YYYY-MM-DD ddd hh:mm aa" },
                { "format": "YYYY-MM-DD dddd hh:mm aa" },
                {
                  "label": "Japanese",
                  "separator": true
                },
                { "format": "YYYY-MM-DD(DDD) hh:mm aa" },
                { "format": "YYYY-MM-DD DDD曜 hh:mm aa" },
                { "format": "YYYY-MM-DD DDDD hh:mm aa" },
                { "format": "YYYY-MM-DD(DDD) AA hh:mm" },
                { "format": "YYYY-MM-DD DDD曜 AA hh:mm" },
                { "format": "YYYY-MM-DD DDDD AA hh:mm" }
              ]
            },
            {
              "label": "'+Time 24'",
              "items": [
                { "format": "YYYY-MM-DD HH:mm" },
                { "format": "YYYY-MM-DD ddd HH:mm" },
                { "format": "YYYY-MM-DD dddd HH:mm" },
                {
                  "label": "Japanese",
                  "separator": true
                },
                { "format": "YYYY-MM-DD(DDD) HH:mm" },
                { "format": "YYYY-MM-DD DDD曜 HH:mm" },
                { "format": "YYYY-MM-DD DDDD HH:mm" }
              ]
            }
          ]
        },
        {
          "label": "YYYY/MM/DD",
          "items": [
            { "format": "YYYY/MM/DD" },
            { "format": "YYYY/MM/DD ddd" },
            { "format": "YYYY/MM/DD dddd" },
            {
              "label": "Japanese",
              "separator": true
            },
            { "format": "YYYY/MM/DD(DDD)" },
            { "format": "YYYY/MM/DD DDD曜" },
            { "format": "YYYY/MM/DD DDDD" },
            {
              "separator": true
            },
            {
              "label": "'+Time 12'",
              "items": [
                { "format": "YYYY/MM/DD hh:mm aa" },
                { "format": "YYYY/MM/DD ddd hh:mm aa" },
                { "format": "YYYY/MM/DD dddd hh:mm aa" },
                {
                  "label": "Japanese",
                  "separator": true
                },
                { "format": "YYYY/MM/DD(DDD) hh:mm aa" },
                { "format": "YYYY/MM/DD DDD曜 hh:mm aa" },
                { "format": "YYYY/MM/DD DDDD hh:mm aa" },
                { "format": "YYYY/MM/DD(DDD) AA hh:mm" },
                { "format": "YYYY/MM/DD DDD曜 AA hh:mm" },
                { "format": "YYYY/MM/DD DDDD AA hh:mm" }
              ]
            },
            {
              "label": "'+Time 24'",
              "items": [
                { "format": "YYYY/MM/DD HH:mm" },
                { "format": "YYYY/MM/DD ddd HH:mm" },
                { "format": "YYYY/MM/DD dddd HH:mm" },
                {
                  "label": "Japanese",
                  "separator": true
                },
                { "format": "YYYY/MM/DD(DDD) HH:mm" },
                { "format": "YYYY/MM/DD DDD曜 HH:mm" },
                { "format": "YYYY/MM/DD DDDD HH:mm" }
              ]
            }
          ]
        },
        {
          "label": "YYYY.MM.DD",
          "items": [
            { "format": "YYYY.MM.DD" },
            { "format": "YYYY.MM.DD ddd" },
            { "format": "YYYY.MM.DD dddd" },
            {
              "label": "Japanese",
              "separator": true
            },
            { "format": "YYYY.MM.DD(DDD)" },
            { "format": "YYYY.MM.DD DDD曜" },
            { "format": "YYYY.MM.DD DDDD" },
            {
              "separator": true
            },
            {
              "label": "'+Time 12'",
              "items": [
                { "format": "YYYY.MM.DD hh:mm aa" },
                { "format": "YYYY.MM.DD ddd hh:mm aa" },
                { "format": "YYYY.MM.DD dddd hh:mm aa" },
                {
                  "label": "Japanese",
                  "separator": true
                },
                { "format": "YYYY.MM.DD(DDD) hh:mm aa" },
                { "format": "YYYY.MM.DD DDD曜 hh:mm aa" },
                { "format": "YYYY.MM.DD DDDD hh:mm aa" },
                { "format": "YYYY.MM.DD(DDD) AA hh:mm" },
                { "format": "YYYY.MM.DD DDD曜 AA hh:mm" },
                { "format": "YYYY.MM.DD DDDD AA hh:mm" }
              ]
            },
            {
              "label": "'+Time 24'",
              "items": [
                { "format": "YYYY.MM.DD HH:mm" },
                { "format": "YYYY.MM.DD ddd HH:mm" },
                { "format": "YYYY.MM.DD dddd HH:mm" },
                {
                  "label": "Japanese",
                  "separator": true
                },
                { "format": "YYYY.MM.DD(DDD) HH:mm" },
                { "format": "YYYY.MM.DD DDD曜 HH:mm" },
                { "format": "YYYY.MM.DD DDDD HH:mm" }
              ]
            }
          ]
        },
        {
          "label": "YYYY MM DD",
          "items": [
            { "format": "YYYY MM DD" },
            { "format": "YYYY MM DD ddd" },
            { "format": "YYYY MM DD dddd" },
            {
              "label": "Japanese",
              "separator": true
            },
            { "format": "YYYY MM DD(DDD)" },
            { "format": "YYYY MM DD DDD曜" },
            { "format": "YYYY MM DD DDDD" },
            {
              "separator": true
            },
            {
              "label": "'+Time 12'",
              "items": [
                { "format": "YYYY MM DD hh:mm aa" },
                { "format": "YYYY MM DD ddd hh:mm aa" },
                { "format": "YYYY MM DD dddd hh:mm aa" },
                {
                  "label": "Japanese",
                  "separator": true
                },
                { "format": "YYYY MM DD(DDD) hh:mm aa" },
                { "format": "YYYY MM DD DDD曜 hh:mm aa" },
                { "format": "YYYY MM DD DDDD hh:mm aa" },
                { "format": "YYYY MM DD(DDD) AA hh:mm" },
                { "format": "YYYY MM DD DDD曜 AA hh:mm" },
                { "format": "YYYY MM DD DDDD AA hh:mm" }
              ]
            },
            {
              "label": "'+Time 24'",
              "items": [
                { "format": "YYYY MM DD HH:mm" },
                { "format": "YYYY MM DD ddd HH:mm" },
                { "format": "YYYY MM DD dddd HH:mm" },
                {
                  "label": "Japanese",
                  "separator": true
                },
                { "format": "YYYY MM DD(DDD) HH:mm" },
                { "format": "YYYY MM DD DDD曜 HH:mm" },
                { "format": "YYYY MM DD DDDD HH:mm" }
              ]
            }
          ]
        },
        {
          "label": "YYYYMMDD",
          "items": [
            { "format": "YYYYMMDD" },
            { "format": "YYYYMMDD ddd" },
            { "format": "YYYYMMDD dddd" },
            {
              "label": "Japanese",
              "separator": true
            },
            { "format": "YYYYMMDD(DDD)" },
            { "format": "YYYYMMDD DDD曜" },
            { "format": "YYYYMMDD DDDD" },
            {
              "separator": true
            },
            {
              "label": "'+Time 12'",
              "items": [
                { "format": "YYYYMMDD hh:mm aa" },
                { "format": "YYYYMMDD ddd hh:mm aa" },
                { "format": "YYYYMMDD dddd hh:mm aa" },
                {
                  "label": "Japanese",
                  "separator": true
                },
                { "format": "YYYYMMDD(DDD) hh:mm aa" },
                { "format": "YYYYMMDD DDD曜 hh:mm aa" },
                { "format": "YYYYMMDD DDDD hh:mm aa" },
                { "format": "YYYYMMDD(DDD) AA hh:mm" },
                { "format": "YYYYMMDD DDD曜 AA hh:mm" },
                { "format": "YYYYMMDD DDDD AA hh:mm" }
              ]
            },
            {
              "label": "'+Time 24'",
              "items": [
                { "format": "YYYYMMDD HH:mm" },
                { "format": "YYYYMMDD ddd HH:mm" },
                { "format": "YYYYMMDD dddd HH:mm" },
                {
                  "label": "Japanese",
                  "separator": true
                },
                { "format": "YYYYMMDD(DDD) HH:mm" },
                { "format": "YYYYMMDD DDD曜 HH:mm" },
                { "format": "YYYYMMDD DDDD HH:mm" }
              ]
            }
          ]
        }
      ]
    },
    {
      "label": "MMM DD, YYYY",
      "items": [
        { "format": "MMM DD, YYYY" },
        { "format": "ddd, MMM DD, YYYY" },
        { "format": "dddd, MMM DD, YYYY" }
      ]
    },
    {
      "label": "MMMMM DD, YYYY",
      "items": [
        { "format": "MMMMM DD, YYYY" },
        { "format": "ddd, MMMMM DD, YYYY" },
        { "format": "dddd, MMMMM DD, YYYY" }
      ]
    },
    {
      "label": "MM DD, YYYY",
      "items": [
        { "format": "MM DD, YYYY" },
        { "format": "ddd, MM DD, YYYY" },
        { "format": "dddd, MM DD, YYYY" }
      ]
    },
    {
      "label": "DD MMM, YYYY",
      "items": [
        { "format": "DD MMM, YYYY" },
        { "format": "ddd, DD MMM, YYYY" },
        { "format": "dddd, DD MMM, YYYY" }
      ]
    },
    {
      "label": "'Root Commands'",
      "items": "RootCommands"
    }
  ]
}
```
