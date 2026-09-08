export type DownloadItem = {
  id: string;
  title: string;
  path: string;
  pages: number;
  size: string;
  bytes: number;
  sha256: string;
  questionCount?: number;
  note?: string;
};

export type DownloadCollection = {
  month: string;
  label: string;
  items: DownloadItem[];
};

export const DOWNLOAD_COLLECTIONS: DownloadCollection[] = [
  {
    month: '2026-08',
    label: 'August 2026',
    items: [
      {
        id: 'aug-complete',
        title: 'PL-300 Complete Collection',
        path: 'dumps/pl300-aug-2026-complete.pdf',
        pages: 501,
        size: '26.52 MB',
        bytes: 27_804_026,
        sha256:
          '8627b36feda33e8ad9d00aff8c155be0aa60019128dc73dd2d8c1d7941d81202',
      },
      {
        id: 'aug-update',
        title: 'PL-300 August Update',
        path: 'dumps/pl300-aug-2026-update.pdf',
        pages: 62,
        size: '2.86 MB',
        bytes: 2_997_627,
        sha256:
          'e34f4dde61673323e8743abfee36521bd4b7564282317a5654426a69b609a1bf',
      },
    ],
  },
  {
    month: '2026-07',
    label: 'July 2026',
    items: [
      {
        id: 'jul-311',
        title: 'July 2026 — 311 Questions',
        path: 'dumps/pl300-jul-2026-311-questions.pdf',
        pages: 62,
        size: '2.53 MB',
        bytes: 2_647_665,
        questionCount: 311,
        sha256:
          '9923d65faf321f6fc9da92782385db8d94f14249c9392c3e947dd38d83d94e9d',
      },
    ],
  },
  {
    month: '2026-06',
    label: 'June 2026',
    items: [
      {
        id: 'jun-233',
        title: 'June 24 — 233 Questions',
        path: 'dumps/pl300-jun-24-2026-233-questions.pdf',
        pages: 28,
        size: '1.40 MB',
        bytes: 1_468_394,
        questionCount: 233,
        sha256:
          '88d9e4ef328d5db198b70a6576667ebddc321215e5acd1261bd8c357d6e9d63b',
      },
      {
        id: 'jun-full',
        title: 'PL-300 Full PDF',
        path: 'dumps/pl300-jun-2026-full.pdf',
        pages: 590,
        size: '27.14 MB',
        bytes: 28_463_079,
        note: 'Password-protected source PDF',
        sha256:
          'bce050d315e7d21fd033f63b56ed3b755655e89dde4c180271d086d66d8b0ed7',
      },
    ],
  },
  {
    month: '2026-05',
    label: 'May 2026',
    items: [
      {
        id: 'may-192',
        title: 'May 29 — 192 Questions',
        path: 'dumps/pl300-may-29-2026-192-questions.pdf',
        pages: 24,
        size: '0.07 MB',
        bytes: 73_313,
        questionCount: 192,
        sha256:
          '4ea3a1ee5d7709ba608387e2ccf9b63a1fa87d813eb0c0ceb32d62abfe71a0bf',
      },
      {
        id: 'may-232',
        title: 'May 19 — 232 Questions',
        path: 'dumps/pl300-may-19-2026-232-questions.pdf',
        pages: 29,
        size: '0.19 MB',
        bytes: 200_620,
        questionCount: 232,
        sha256:
          'ccc7cfd705d96cfb5fef7eb08d5e1eea51e39ef8db1fd01b69ef3422dec96a3e',
      },
    ],
  },
  {
    month: '2026-04',
    label: 'April 2026',
    items: [
      {
        id: 'apr-287',
        title: 'April 27 — 287 Questions',
        path: 'dumps/pl300-apr-27-2026-287-questions.pdf',
        pages: 23,
        size: '1.11 MB',
        bytes: 1_158_852,
        questionCount: 287,
        sha256:
          '8e97cafe1d95e4fbc321fe62d8a8a564099df63825dc75ced44b180ae4a937a1',
      },
      {
        id: 'apr-344',
        title: 'April 14 — 344 Questions',
        path: 'dumps/pl300-apr-14-2026-344-questions.pdf',
        pages: 61,
        size: '2.16 MB',
        bytes: 2_269_323,
        questionCount: 344,
        sha256:
          'a6e9881e4f7f577b5297c5697a0f09fa4d6589875f56bb108892e2f5cc4f39ca',
      },
      {
        id: 'apr-176',
        title: 'April 4 — 176 Questions',
        path: 'dumps/pl300-apr-04-2026-176-questions.pdf',
        pages: 57,
        size: '2.30 MB',
        bytes: 2_412_866,
        questionCount: 176,
        sha256:
          'dfb071757231cc4f8ec6cb97d72b995cb142da7f55008e118a085aa817b62032',
      },
    ],
  },
  {
    month: '2026-03',
    label: 'March 2026',
    items: [
      {
        id: 'mar-252',
        title: 'March 27 — 252 Questions',
        path: 'dumps/pl300-mar-27-2026-252-questions.pdf',
        pages: 34,
        size: '0.10 MB',
        bytes: 101_016,
        questionCount: 252,
        sha256:
          '868f508702ca3792c945107d9c4bd9921ad60135d05c52a9187417fbfe306ec7',
      },
    ],
  },
  {
    month: '2026-01',
    label: 'January 2026',
    items: [
      {
        id: 'jan-mustafa',
        title: 'Mustafa Elryah — January Update',
        path: 'dumps/pl300-jan-2026-mustafa-update.pdf',
        pages: 504,
        size: '39.71 MB',
        bytes: 41_643_856,
        sha256:
          '6af0df0bfc15e0bbe13d8c14b16ced19629642771f37dd25425c484f5e4ac06e',
      },
    ],
  },
];

export const DOWNLOAD_COUNT = DOWNLOAD_COLLECTIONS.reduce(
  (total, collection) => total + collection.items.length,
  0,
);

export const DOWNLOAD_BYTES = DOWNLOAD_COLLECTIONS.reduce(
  (total, collection) =>
    total + collection.items.reduce((sum, item) => sum + item.bytes, 0),
  0,
);
