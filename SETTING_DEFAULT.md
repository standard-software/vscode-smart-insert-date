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
    { "format": "YYYY-MM-DD ddd HH:mm:ss" },
    { "format": "ddd, MMM DD, YYYY hh:mm:ss aa" },
    { "format": "dddd, MMMMM DD, YYYY hh:mm:ss aa" },
    { "format": "dddd, MM DD, YYYY hh:mm:ss aa" },
    { "format": "ddd, DD MMM, YYYY HH:mm:ss" },
    { "format": "YYYY/MM/DD ddd HH:mm:ss" },
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
      "label": "YYYY-MM-DD",
      "items": [
        { "format": "YYYY-MM-DD" },
        { "format": "YYYY-MM-DD ddd" },
        { "format": "YYYY-MM-DD dddd" },
        {
          "label": "+Time 12",
          "separator": true
        },
        { "format": "YYYY-MM-DD hh:mm:ss aa" },
        { "format": "YYYY-MM-DD ddd hh:mm:ss aa" },
        { "format": "YYYY-MM-DD dddd hh:mm:ss aa" },
        {
          "label": "+Time 24",
          "separator": true
        },
        { "format": "YYYY-MM-DD HH:mm:ss" },
        { "format": "YYYY-MM-DD ddd HH:mm:ss" },
        { "format": "YYYY-MM-DD dddd HH:mm:ss" }
      ]
    },
    {
      "label": "YYYY/MM/DD",
      "items": [
        { "format": "YYYY/MM/DD" },
        { "format": "YYYY/MM/DD ddd" },
        { "format": "YYYY/MM/DD dddd" },
        {
          "label": "+Time 12",
          "separator": true
        },
        { "format": "YYYY/MM/DD hh:mm:ss aa" },
        { "format": "YYYY/MM/DD ddd hh:mm:ss aa" },
        { "format": "YYYY/MM/DD dddd hh:mm:ss aa" },
        {
          "label": "+Time 24",
          "separator": true
        },
        { "format": "YYYY/MM/DD HH:mm:ss" },
        { "format": "YYYY/MM/DD ddd HH:mm:ss" },
        { "format": "YYYY/MM/DD dddd HH:mm:ss" }
      ]
    },
    {
      "label": "YYYY.MM.DD 'etc'",
      "items": [
        {
          "label": "YYYY.MM.DD",
          "items": [
            { "format": "YYYY.MM.DD" },
            { "format": "YYYY.MM.DD ddd" },
            { "format": "YYYY.MM.DD dddd" },
            {
              "label": "+Time 12",
              "separator": true
            },
            { "format": "YYYY.MM.DD hh:mm:ss aa" },
            { "format": "YYYY.MM.DD ddd hh:mm:ss aa" },
            { "format": "YYYY.MM.DD dddd hh:mm:ss aa" },
            {
              "label": "+Time 24",
              "separator": true
            },
            { "format": "YYYY.MM.DD HH:mm:ss" },
            { "format": "YYYY.MM.DD ddd HH:mm:ss" },
            { "format": "YYYY.MM.DD dddd HH:mm:ss" }
          ]
        },
        {
          "label": "YYYY MM DD",
          "items": [
            { "format": "YYYY MM DD" },
            { "format": "YYYY MM DD ddd" },
            { "format": "YYYY MM DD dddd" },
            {
              "label": "+Time 12",
              "separator": true
            },
            { "format": "YYYY MM DD hh:mm:ss aa" },
            { "format": "YYYY MM DD ddd hh:mm:ss aa" },
            { "format": "YYYY MM DD dddd hh:mm:ss aa" },
            {
              "label": "+Time 24",
              "separator": true
            },
            { "format": "YYYY MM DD HH:mm:ss" },
            { "format": "YYYY MM DD ddd HH:mm:ss" },
            { "format": "YYYY MM DD dddd HH:mm:ss" }
          ]
        },
        {
          "label": "YYYYMMDD",
          "items": [
            { "format": "YYYYMMDD" },
            { "format": "YYYYMMDD ddd" },
            { "format": "YYYYMMDD dddd" },
            {
              "label": "+Time 12",
              "separator": true
            },
            { "format": "YYYYMMDD hh:mm:ss aa" },
            { "format": "YYYYMMDD ddd hh:mm:ss aa" },
            { "format": "YYYYMMDD dddd hh:mm:ss aa" },
            {
              "label": "+Time 24",
              "separator": true
            },
            { "format": "YYYYMMDD HH:mm:ss" },
            { "format": "YYYYMMDD ddd HH:mm:ss" },
            { "format": "YYYYMMDD dddd HH:mm:ss" }
          ]
        }
      ]
    },
    {
      "label": "MMM DD, YYYY",
      "items": [
        { "format": "MMM DD, YYYY" },
        { "format": "ddd, MMM DD, YYYY" },
        { "format": "dddd, MMM DD, YYYY" },
        {
          "label": "+Time 12",
          "separator": true
        },
        { "format": "MMM DD, YYYY hh:mm:ss aa" },
        { "format": "ddd, MMM DD, YYYY hh:mm:ss aa" },
        { "format": "dddd, MMM DD, YYYY hh:mm:ss aa" },
        {
          "label": "+Time 24",
          "separator": true
        },
        { "format": "MMM DD, YYYY HH:mm:ss" },
        { "format": "ddd, MMM DD, YYYY HH:mm:ss" },
        { "format": "dddd, MMM DD, YYYY HH:mm:ss" }
      ]
    },
    {
      "label": "MMMMM DD, YYYY",
      "items": [
        { "format": "MMMMM DD, YYYY" },
        { "format": "ddd, MMMMM DD, YYYY" },
        { "format": "dddd, MMMMM DD, YYYY" },
        {
          "label": "+Time 12",
          "separator": true
        },
        { "format": "MMMMM DD, YYYY hh:mm:ss aa" },
        { "format": "ddd, MMMMM DD, YYYY hh:mm:ss aa" },
        { "format": "dddd, MMMMM DD, YYYY hh:mm:ss aa" },
        {
          "label": "+Time 24",
          "separator": true
        },
        { "format": "MMMMM DD, YYYY HH:mm:ss" },
        { "format": "ddd, MMMMM DD, YYYY HH:mm:ss" },
        { "format": "dddd, MMMMM DD, YYYY HH:mm:ss" }
      ]
    },
    {
      "label": "MM DD, YYYY",
      "items": [
        { "format": "MM DD, YYYY" },
        { "format": "ddd, MM DD, YYYY" },
        { "format": "dddd, MM DD, YYYY" },
        {
          "label": "+Time 12",
          "separator": true
        },
        { "format": "MM DD, YYYY hh:mm:ss aa" },
        { "format": "ddd, MM DD, YYYY hh:mm:ss aa" },
        { "format": "dddd, MM DD, YYYY hh:mm:ss aa" },
        {
          "label": "+Time 24",
          "separator": true
        },
        { "format": "MM DD, YYYY HH:mm:ss" },
        { "format": "ddd, MM DD, YYYY HH:mm:ss" },
        { "format": "dddd, MM DD, YYYY HH:mm:ss" }
      ]
    },
    {
      "label": "DD MMM, YYYY",
      "items": [
        { "format": "DD MMM, YYYY" },
        { "format": "ddd, DD MMM, YYYY" },
        { "format": "dddd, DD MMM, YYYY" },
        {
          "label": "+Time 12",
          "separator": true
        },
        { "format": "DD MMM, YYYY hh:mm:ss aa" },
        { "format": "ddd, DD MMM, YYYY hh:mm:ss aa" },
        { "format": "dddd, DD MMM, YYYY hh:mm:ss aa" },
        {
          "label": "+Time 24",
          "separator": true
        },
        { "format": "DD MMM, YYYY HH:mm:ss" },
        { "format": "ddd, DD MMM, YYYY HH:mm:ss" },
        { "format": "dddd, DD MMM, YYYY HH:mm:ss" }
      ]
    },
    {
      "label": "'Root Commands'",
      "items": "RootCommands"
    }
  ],
  "SmartInsertDate.MenuDate": [
    {
      "label": "YYYY-MM-DD",
      "items": [
        { "format": "YYYY-MM-DD" },
        { "format": "YYYY-MM-DD ddd" },
        { "format": "YYYY-MM-DD dddd" }
      ]
    },
    {
      "label": "YYYY/MM/DD",
      "items": [
        { "format": "YYYY/MM/DD" },
        { "format": "YYYY/MM/DD ddd" },
        { "format": "YYYY/MM/DD dddd" }
      ]
    },
    {
      "label": "YYYY.MM.DD 'etc'",
      "items": [
        {
          "label": "YYYY.MM.DD",
          "items": [
            { "format": "YYYY.MM.DD" },
            { "format": "YYYY.MM.DD ddd" },
            { "format": "YYYY.MM.DD dddd" }
          ]
        },
        {
          "label": "YYYY MM DD",
          "items": [
            { "format": "YYYY MM DD" },
            { "format": "YYYY MM DD ddd" },
            { "format": "YYYY MM DD dddd" }
          ]
        },
        {
          "label": "YYYYMMDD",
          "items": [
            { "format": "YYYYMMDD" },
            { "format": "YYYYMMDD ddd" },
            { "format": "YYYYMMDD dddd" }
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
