export const getOSName = (): string => {
  let os = "";
  const clientStrings = [
    {
      r: /(Windows 10.0|Windows NT 10.0)/,
      s: "Windows 10",
    },
    {
      r: /(Windows 8.1|Windows NT 6.3)/,
      s: "Windows 8.1",
    },
    {
      r: /(Windows 8|Windows NT 6.2)/,
      s: "Windows 8",
    },
    {
      r: /(Windows 7|Windows NT 6.1)/,
      s: "Windows 7",
    },
    {
      r: /Windows NT 6.0/,
      s: "Windows Vista",
    },
    {
      r: /Windows NT 5.2/,
      s: "Windows Server 2003",
    },
    {
      r: /(Windows NT 5.1|Windows XP)/,
      s: "Windows XP",
    },
    {
      r: /(Windows NT 5.0|Windows 2000)/,
      s: "Windows 2000",
    },
    {
      r: /(Win 9x 4.90|Windows ME)/,
      s: "Windows ME",
    },
    {
      r: /(Windows 98|Win98)/,
      s: "Windows 98",
    },
    {
      r: /(Windows 95|Win95|Windows_95)/,
      s: "Windows 95",
    },
    {
      r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
      s: "Windows NT 4.0",
    },
    {
      r: /Windows CE/,
      s: "Windows CE",
    },
    {
      r: /Win16/,
      s: "Windows 3.11",
    },
    {
      r: /Android/,
      s: "Android",
    },
    {
      r: /OpenBSD/,
      s: "Open BSD",
    },
    {
      r: /SunOS/,
      s: "Sun OS",
    },
    {
      r: /(Linux|X11)/,
      s: "Linux",
    },
    {
      r: /(iPhone|iPad|iPod)/,
      s: "iOS",
    },
    {
      r: /Mac OS X/,
      s: "Mac OS X",
    },
    {
      r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
      s: "Mac OS",
    },
    {
      r: /QNX/,
      s: "QNX",
    },
    {
      r: /UNIX/,
      s: "UNIX",
    },
    {
      r: /BeOS/,
      s: "BeOS",
    },
    {
      r: /OS\/2/,
      s: "OS/2",
    },
    {
      r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      s: "Search Bot",
    },
  ];

  for (let j = 0; j < clientStrings.length; j++) {
    const cs = clientStrings[j];

    if (cs.r.test(navigator.userAgent)) {
      os = cs.s;
      break;
    }
  }
  return os;
};
