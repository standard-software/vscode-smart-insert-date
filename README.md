# Smart Insert Date

[![](https://vsmarketplacebadges.dev/version-short/SatoshiYamamoto.vscode-smart-insert-date.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-smart-insert-date)
[![](https://vsmarketplacebadges.dev/installs-short/SatoshiYamamoto.vscode-smart-insert-date.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-smart-insert-date)
[![](https://vsmarketplacebadges.dev/rating-short/SatoshiYamamoto.vscode-smart-insert-date.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-smart-insert-date)
[![](https://img.shields.io/github/license/standard-software/vscode-smart-insert-date.png)](https://github.com/standard-software/vscode-smart-insert-date/blob/main/LICENSE)

This extension inserts formatted dates and times into the editor.

Dates can be selected in weeks, months or years.

## Install

Smart Insert Date - Visual Studio Marketplace  
https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-smart-insert-date

## GitHub

standard-software/vscode-smart-insert-date  
https://github.com/standard-software/vscode-smart-insert-date

## Contact

Please contact me if you have any requests.

Satoshi Yamamoto  
standard.software.net@gmail.com  
Japanese / English

## Command

```
- Smart Insert Date : Insert Today
- Smart Insert Date : Insert Now DateTime
- Smart Insert Date : Insert Now Time
- Smart Insert Date : Select Date ...
- Smart Insert Date : Select Format ...
```

### Default Key

| Command             | Default Key Windows     | Default Key Mac         |
|-                    |-                        | -                       |
| Insert Today        | Alt + Ctrl + ;          | Opt + Ctrl + ;          |
| Insert Now DateTime | Alt + Ctrl + Shift + ;  | Opt + Ctrl + Shift + ;  |
| Insert Now Time     | Alt + Shift + ;         | Opt + Shift + ;         |

## Usage

Selecting the command inserts the date and time at the cursor position.

```
- Smart Insert Date : Insert Today
- Smart Insert Date : Insert Now DateTime
- Smart Insert Date : Insert Now Time
```

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

## Output Example

By default, the following formatted date and time can be output.  
The settings can also be changed.

### Insert Today
```
2023-12-15 Fri
Fri, Dec 15, 2023
Friday, December 15, 2023
Friday, 12 15, 2023
Fri, 15 Dec, 2023
2023/12/15(Fri)
20231215
```

### Insert Now DateTime
```
2023-12-15 Fri 23:02
Fri, Dec 15, 2023 11:02 pm
Friday, December 15, 2023 11:02 pm
Friday, 12 15, 2023 11:02 pm
Fri, 15 Dec, 2023 23:02
2023/12/15(Fri) PM11:03:32
20231215230332
```

### Insert Now Time
```
23:03
11:03 pm
PM11:04:04
23:04:06
```


## Select Format

```
- Smart Insert Date : Select Format ...
```

Select Format is a tree menu structure.This can be changed through customization.

```
- 2024-09-18 >>
  - 2024-09-18
  - 2024-09-18 Wed
  - 2024-09-18 Wednesday
  --- +Time 12
  - 2024-09-18 10:59:47 am
  - 2024-09-18 Wed 10:59:47 am
  - 2024-09-18 Wednesday 10:59:47 am
  --- +Time 24
  - 2024-09-18 10:59:47
  - 2024-09-18 Wed 10:59:47
  - 2024-09-18 Wednesday 10:59:47
  
- 2024/09/18 >>
  - ...
- 2024.09.18 etc >>
  - ...
- Sep 18, 2024 >>
  - ...
- September 18, 2024 >>
  - ...
- 09 18, 2024 >>
  - ...
- 18 Sep, 2024 >>
  - ...
- Root Commands  >>
  --- Date
  - 2024-09-18 Wed
  - Wed, Sep 18, 2024
  - Wednesday, September 18, 2024
  - Wednesday, 09 18, 2024
  - Wed, 18 Sep, 2024
  - 2024/09/18 Wed
  - 2024/09/18(Wed)
  - 20240918
  --- DateTime
  - 2024-09-18 Wed 11:04:12
  - Wed, Sep 18, 2024 11:04:12 am
  - Wednesday, September 18, 2024 11:04:12 am
  - Wednesday, 09 18, 2024 11:04:12 am
  - Wed, 18 Sep, 2024 11:04:12
  - 2024/09/18 Wed 11:04:12
  - 2024/09/18(Wed) AM 11:04:12
  - 20240918110442
  --- Time
  - 11:04
  - 11:04 am
  - AM 11:04
  - 11:04:12
  - 11:04:12 am
  - AM 11:04:12
```

Customization can be done in the “SmartInsertDate.MenuDateTime” field.

Root Command works in conjunction with the following command settings.
```
- Smart Insert Date : Insert Today
- Smart Insert Date : Insert Now DateTime
- Smart Insert Date : Insert Now Time
```

## Select Date

```
- Smart Insert Date : Select Date ...
```
Select Date is a tree menu structure.

![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_selectdate_01.png)
![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_selectdate_02.png)
![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_selectdate_03.png)
![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_selectdate_04.png)
![](https://raw.githubusercontent.com/standard-software/vscode-smart-insert-date/main/img/readme_selectdate_05.png)

After selecting the date, you can choose the format.

This format can be customized in the “SmartInsertDate.MenuDate” section.

## Multi Cursor

If you are using a multi-cursor, the date can be added to output the format.

### Date
```
_|_

__|__

___|___
```
↓
```
_2024-09-14 Sat_

__2024-09-15 Sun__

___2024-09-16 Mon___
```

### DateTime
```
|
|
|
|
```
↓
```
Wed, Sep 18, 2024 11:29:41 am
Thu, Sep 19, 2024 11:29:41 am
Fri, Sep 20, 2024 11:29:41 am
Sat, Sep 21, 2024 11:29:41 am
```

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

## Setting Sample

settings.json can be found in the following file.

[Default Setting ./SETTING_DEFAULT.md](./SETTING_DEFAULT.md)

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

### Setting Sample

[Setting for Japanese ./SETTING_JAPANESE.md](./SETTING_JAPANESE.md)

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

