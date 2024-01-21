# Smart Insert Date

[![](https://vsmarketplacebadges.dev/version-short/SatoshiYamamoto.vscode-smart-insert-date.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-smart-insert-date)
[![](https://vsmarketplacebadges.dev/installs-short/SatoshiYamamoto.vscode-smart-insert-date.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-smart-insert-date)
[![](https://vsmarketplacebadges.dev/rating-short/SatoshiYamamoto.vscode-smart-insert-date.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-smart-insert-date)
[![](https://img.shields.io/github/license/standard-software/vscode-date-time-calendar.png)](https://github.com/standard-software/vscode-date-time-calendar/blob/main/LICENSE)

This extension inserts formatted dates and times into the editor.

Dates can be selected in weeks, months or years.

## Output Example

You can change the format settings, but the default is to allow the output of the following content

### Date
```
2023-12-15 Fri
Fri, Dec 15, 2023
Friday, December 15, 2023
Friday, 12 15, 2023
Fri, 15 Dec, 2023
2023/12/15(Fri)
20231215
```

### Datetime
```
2023-12-15 Fri 23:02
Fri, Dec 15, 2023 11:02 pm
Friday, December 15, 2023 11:02 pm
Friday, 12 15, 2023 11:02 pm
Fri, 15 Dec, 2023 23:02
2023/12/15(Fri) PM11:03:32
20231215230332
```

### Time
```
23:03
11:03 pm
PM11:04:04
23:04:06
```

## Command

```
- Smart Insert Date : Insert Today
- Smart Insert Date : Insert Now DateTime
- Smart Insert Date : Insert Now Time
- Smart Insert Date : Select Date
- Smart Insert Date : Select Format
```

Windows  
![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_command_win.png)

Mac  
![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_command_mac.png)

### Default Key

| Command             | Default Key Windows     | Default Key Mac         |
|-                    |-                        | -                       |
| Insert Today        | Alt + Ctrl +  ;          | Opt + Ctrl +  ;          |
| Insert Now DateTime | Alt + Ctrl + Shift +  ;  | Opt + Ctrl + Shift +  ;  |
| Insert Now Time     | Alt + Shift +  ;         | Opt + Shift +  ;         |

## Usage

### Insert

- Press
  - Windows[`Alt + Ctrl + ;`]
  - Mac[`Opt + Ctrl + ;`]
- run [Smart Insert Date : Insert Today]
- Inserted, text is selected
```
2023-12-16 Sat
```
- Press the same shortcut key again.
- Change format 
```
Sat, Dec 16, 2023
```
- Press the same shortcut key again.
- Change format
```
Saturday, December 16, 2023
```
- rotate

run [Smart Insert Date : Insert Now DateTime]  
run [Smart Insert Date : Insert Now Time]  
Works the same way.

### Select Format

- run [Smart Insert Date : Select Format]
![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_selectformat.png)


### Select Date

- run [Smart Insert Date : Select Date]
![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_selectdate_01.png)
![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_selectdate_02.png)
![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_selectdate_03.png)
![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_selectdate_04.png)
![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_selectdate_05.png)


## Recommended key bindings

keybindings.json
```json
[
  {
    "key": "shift+f5",
    "command": "vscode-smart-insert-date.Today"
  },
  {
    "key": "ctrl+shift+f5",
    "command": "vscode-smart-insert-date.NowDateTime"
  },
  {
    "key": "ctrl+f5",
    "command": "vscode-smart-insert-date.NowTime"
  },
]
```

## Setting

settings.json

```json
{
  "SmartInsertDate.DateFormat": [
    { "format": "YYYY-MM-DD ddd" },
    { "format": "ddd, MMM DD, YYYY" },
    { "format": "dddd, MMMMM DD, YYYY" },
    { "format": "dddd, MM DD, YYYY" },
    { "format": "ddd, DD MMM, YYYY" },
    { "format": "YYYY/MM/DD(ddd)" },
    { "format": "YYYYMMDD" }
  ],
  "SmartInsertDate.DateTimeFormat": [
    { "format": "YYYY-MM-DD ddd HH:mm" },
    { "format": "ddd, MMM DD, YYYY hh:mm aa" },
    { "format": "dddd, MMMMM DD, YYYY hh:mm aa" },
    { "format": "dddd, MM DD, YYYY hh:mm aa" },
    { "format": "ddd, DD MMM, YYYY HH:mm" },
    { "format": "YYYY/MM/DD(ddd) AAhh:mm:ss" },
    { "format": "YYYYMMDDHHmmss" }
  ],
  "SmartInsertDate.TimeFormat": [
    { "format": "HH:mm" },
    { "format": "hh:mm aa" },
    { "format": "AAhh:mm:ss" },
    { "format": "HH:mm:ss" }
  ],
}
```

## Date Format String

> For example  
>  2023-12-16 Sat 00:26
>  YYYY-MM-DD ddd HH:mm

_ = Space

| Format  | Value     | Memo  |
| -       | -         | -     |
| `YYYY`  | 2022      |
| `YY`    | 22        |
| `MM`    | 01        |
| `M`     | 1         |
| `SM`    | _1        |
| `DD`    | 09        |
| `D`     | 9         |
| `SD`    | _9        | 
| `HH`    | 18        |
| `H`     | 18        | 0-24
| `hh`    | 06        | 0-12,1-23
| `h`     | 6         |
| `mm`    | 05        |
| `m`     | 5         |
| `ss`    | 07        |
| `s`     | 7         |
| `SSS`   | 999       | 000-999 MilliSeconds
| `SS`    | 99        | 00-99  MilliSeconds
| `S`     | 9         | 0-9  MilliSeconds
| `aa`    | pm        | am,pm
| `AA`    | PM        | AM,PM
| `a`     | a         | a,p
| `A`     | A         | A,P
| `dd`    | Su        | Su,Mo,Tu,We,Th,Fr,Sa
| `ddd`   | Sun       | Sun,Mon,Tue,Wed,Thu,Fri,Sat
| `dddd`  | Sunday    | Sunday,Monday,Tuesday,...
| `MMM`   | Jan       | Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec
| `MMMM`  | Jan.      | Jan.,Feb.,Mar.,Apr.,May,June,July,Aug.,Sep.,Oct.,Nov.,Dec.
| `MMMMM` | January   |
| `Z`     | 09:00     | timezone
| `ZZ`    | 0900      | timezone
| `LMMMMM`| January__ | Left align space-filling
| `RMMMMM`| __January | Right align space-filling

## To Japanese

### Setting
settings.json

```json
{
  "SmartInsertDate.DateFormat": [
    { "format": "YYYY/MM/DD(DDD)" },
    { "format": "YYYY年MM月DD日 DDDD" },
    { "format": "GE年MM月DD日" },
    { "format": "GGE年MM月DD日 DDD" },
    { "format": "GGGEE年MM月DD日 DDDD" }
  ],
  "SmartInsertDate.DateTimeFormat": [
    { "format": "YYYY/MM/DD(DDD) HH:mm" },
    { "format": "YYYY年MM月DD日 DDDD AAAhh時mm分" }
  ],
  "SmartInsertDate.TimeFormat": [
    { "format": "AAAhh時mm分" }
  ],
}
```

### Date Format String

| Format  | Value     | Memo  |
| -       | -         | -     |
| `DDD`   | 火        | DayOfWeek text: 日,月,火,水,木,金,土
| `DDDD`  | 火曜日    | DayOfWeek text: 日曜日,月曜日,火曜日,...
| `AAA`   | 午後      | ampm: 午前,午後
| `G`     | R         | Japanese imperial year: R,H,S,T,M 
| `GG`    | 令        | Japanese imperial year: 令,平,昭,大,明 
| `GGG`   | 令和      | Japanese imperial year: 令和,平成,昭和,大正,明治
| `E`     | 6         | A.D.2024 = R6
| `EE`    | 06        | A.D.2024 = R06


## To Chinese, To Taiwanese

### Setting
settings.json

```json
{
  "SmartInsertDate.CustomDayOfWeekLong": {
    "Sun": "星期日",
    "Mon": "星期一",
    "Tue": "星期二",
    "Wed": "星期三",
    "Thu": "星期四",
    "Fri": "星期五",
    "Sat": "星期六"
  },
  "SmartInsertDate.CustomDayOfWeekShort": {
    "Sun": "日",
    "Mon": "一",
    "Tue": "二",
    "Wed": "三",
    "Thu": "四",
    "Fri": "五",
    "Sat": "六"
  },
  "SmartInsertDate.CustomAmPmShort": {
    "am": "上",
    "pm": "下"
  },
  "SmartInsertDate.CustomAmPmLong": {
    "am": "上午",
    "pm": "下午"
  }
  "SmartInsertDate.DateFormat": [
    { "format": "YYYY/MM/DD(DDD)" },
    { "format": "YYYY年MM月DD号 DDDD" }
  ],
  "SmartInsertDate.DateTimeFormat": [
    { "format": "YYYY/MM/DD(DDD) HH:mm" },
    { "format": "YYYY年MM月DD号 DDDD AAAhh点mm分ss秒" }
  ],
  "SmartInsertDate.TimeFormat": [
    { "format": "AAAhh点mm分ss秒" }
    { "format": "AAAAhh点mm分ss秒" }
  ]
}
```

Other Patterns
```json
  "SmartInsertDate.CustomDayOfWeekLong": {
    "Sun": "禮拜日",
    "Mon": "禮拜一",
    "Tue": "禮拜二",
    "Wed": "禮拜三",
    "Thu": "禮拜四",
    "Fri": "禮拜五",
    "Sat": "禮拜六"
  },
```

### Date Format String

| Format  | Value     | Memo  |
| -       | -         | -     |
| `DDD`   | 二        | DayOfWeek text: 日,一,二,三,四,五,六
| `DDDD`  | 星期二    | DayOfWeek text: 星期日,星期一,星期二,...
| `AAA`   | 下        | ampm: 上,下
| `AAAA`  | 下午      | ampm: 上午,下午

## License

Released under the [MIT License][license].
