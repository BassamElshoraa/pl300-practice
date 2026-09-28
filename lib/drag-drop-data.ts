export type DragDropOption = {
  image: string;
  width: number;
  height: number;
};

export type DragDropSpec = {
  mode: 'sequence' | 'matching';
  slots: number;
  allowReuse: boolean;
  options: DragDropOption[];
};

export const dragDropData: Record<string, DragDropSpec> = {
  "f1-006-5": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-006-5-option-1.webp",
        "width": 89,
        "height": 48
      },
      {
        "image": "/drag-assets/f1-006-5-option-2.webp",
        "width": 89,
        "height": 48
      },
      {
        "image": "/drag-assets/f1-006-5-option-3.webp",
        "width": 89,
        "height": 47
      },
      {
        "image": "/drag-assets/f1-006-5-option-4.webp",
        "width": 89,
        "height": 47
      },
      {
        "image": "/drag-assets/f1-006-5-option-5.webp",
        "width": 89,
        "height": 47
      },
      {
        "image": "/drag-assets/f1-006-5-option-6.webp",
        "width": 89,
        "height": 47
      }
    ]
  },
  "f1-009-8": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-009-8-option-1.webp",
        "width": 344,
        "height": 27
      },
      {
        "image": "/drag-assets/f1-009-8-option-2.webp",
        "width": 344,
        "height": 26
      },
      {
        "image": "/drag-assets/f1-009-8-option-3.webp",
        "width": 344,
        "height": 27
      },
      {
        "image": "/drag-assets/f1-009-8-option-4.webp",
        "width": 344,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-009-8-option-5.webp",
        "width": 344,
        "height": 26
      }
    ]
  },
  "f1-015-14": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-015-14-option-1.webp",
        "width": 329,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-015-14-option-2.webp",
        "width": 329,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-015-14-option-3.webp",
        "width": 329,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-015-14-option-4.webp",
        "width": 329,
        "height": 29
      },
      {
        "image": "/drag-assets/f1-015-14-option-5.webp",
        "width": 329,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-015-14-option-6.webp",
        "width": 329,
        "height": 28
      }
    ]
  },
  "f1-017-16": {
    "mode": "sequence",
    "slots": 4,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-017-16-option-1.webp",
        "width": 248,
        "height": 76
      },
      {
        "image": "/drag-assets/f1-017-16-option-2.webp",
        "width": 248,
        "height": 77
      },
      {
        "image": "/drag-assets/f1-017-16-option-3.webp",
        "width": 248,
        "height": 77
      },
      {
        "image": "/drag-assets/f1-017-16-option-4.webp",
        "width": 248,
        "height": 77
      },
      {
        "image": "/drag-assets/f1-017-16-option-5.webp",
        "width": 248,
        "height": 77
      }
    ]
  },
  "f1-019-18": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-019-18-option-1.webp",
        "width": 303,
        "height": 56
      },
      {
        "image": "/drag-assets/f1-019-18-option-2.webp",
        "width": 303,
        "height": 57
      },
      {
        "image": "/drag-assets/f1-019-18-option-3.webp",
        "width": 303,
        "height": 56
      },
      {
        "image": "/drag-assets/f1-019-18-option-4.webp",
        "width": 303,
        "height": 56
      },
      {
        "image": "/drag-assets/f1-019-18-option-5.webp",
        "width": 303,
        "height": 57
      }
    ]
  },
  "f1-023-22": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-023-22-option-1.webp",
        "width": 360,
        "height": 32
      },
      {
        "image": "/drag-assets/f1-023-22-option-2.webp",
        "width": 360,
        "height": 30
      },
      {
        "image": "/drag-assets/f1-023-22-option-3.webp",
        "width": 360,
        "height": 30
      },
      {
        "image": "/drag-assets/f1-023-22-option-4.webp",
        "width": 360,
        "height": 30
      },
      {
        "image": "/drag-assets/f1-023-22-option-5.webp",
        "width": 360,
        "height": 31
      }
    ]
  },
  "f1-028-27": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-028-27-option-1.webp",
        "width": 215,
        "height": 45
      },
      {
        "image": "/drag-assets/f1-028-27-option-2.webp",
        "width": 215,
        "height": 46
      },
      {
        "image": "/drag-assets/f1-028-27-option-3.webp",
        "width": 215,
        "height": 46
      },
      {
        "image": "/drag-assets/f1-028-27-option-4.webp",
        "width": 215,
        "height": 45
      }
    ]
  },
  "f1-065-64": {
    "mode": "sequence",
    "slots": 4,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-065-64-option-1.webp",
        "width": 351,
        "height": 19
      },
      {
        "image": "/drag-assets/f1-065-64-option-2.webp",
        "width": 351,
        "height": 25
      },
      {
        "image": "/drag-assets/f1-065-64-option-3.webp",
        "width": 351,
        "height": 24
      },
      {
        "image": "/drag-assets/f1-065-64-option-4.webp",
        "width": 351,
        "height": 25
      },
      {
        "image": "/drag-assets/f1-065-64-option-5.webp",
        "width": 351,
        "height": 25
      }
    ]
  },
  "f1-066-65": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-066-65-option-1.webp",
        "width": 350,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-066-65-option-2.webp",
        "width": 350,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-066-65-option-3.webp",
        "width": 350,
        "height": 29
      },
      {
        "image": "/drag-assets/f1-066-65-option-4.webp",
        "width": 350,
        "height": 41
      },
      {
        "image": "/drag-assets/f1-066-65-option-5.webp",
        "width": 350,
        "height": 41
      },
      {
        "image": "/drag-assets/f1-066-65-option-6.webp",
        "width": 350,
        "height": 28
      }
    ]
  },
  "f1-073-72": {
    "mode": "sequence",
    "slots": 4,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-073-72-option-1.webp",
        "width": 308,
        "height": 35
      },
      {
        "image": "/drag-assets/f1-073-72-option-2.webp",
        "width": 308,
        "height": 35
      },
      {
        "image": "/drag-assets/f1-073-72-option-3.webp",
        "width": 308,
        "height": 35
      },
      {
        "image": "/drag-assets/f1-073-72-option-4.webp",
        "width": 308,
        "height": 36
      },
      {
        "image": "/drag-assets/f1-073-72-option-5.webp",
        "width": 308,
        "height": 35
      },
      {
        "image": "/drag-assets/f1-073-72-option-6.webp",
        "width": 308,
        "height": 34
      }
    ]
  },
  "f1-088-87": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-088-87-option-1.webp",
        "width": 337,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-088-87-option-2.webp",
        "width": 337,
        "height": 27
      },
      {
        "image": "/drag-assets/f1-088-87-option-3.webp",
        "width": 337,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-088-87-option-4.webp",
        "width": 337,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-088-87-option-5.webp",
        "width": 337,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-088-87-option-6.webp",
        "width": 337,
        "height": 27
      }
    ]
  },
  "f1-091-90": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-091-90-option-1.webp",
        "width": 109,
        "height": 30
      },
      {
        "image": "/drag-assets/f1-091-90-option-2.webp",
        "width": 109,
        "height": 29
      },
      {
        "image": "/drag-assets/f1-091-90-option-3.webp",
        "width": 109,
        "height": 29
      },
      {
        "image": "/drag-assets/f1-091-90-option-4.webp",
        "width": 109,
        "height": 29
      },
      {
        "image": "/drag-assets/f1-091-90-option-5.webp",
        "width": 109,
        "height": 29
      },
      {
        "image": "/drag-assets/f1-091-90-option-6.webp",
        "width": 109,
        "height": 30
      }
    ]
  },
  "f1-095-94": {
    "mode": "matching",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-095-94-option-1.webp",
        "width": 157,
        "height": 34
      },
      {
        "image": "/drag-assets/f1-095-94-option-2.webp",
        "width": 157,
        "height": 35
      },
      {
        "image": "/drag-assets/f1-095-94-option-3.webp",
        "width": 157,
        "height": 34
      },
      {
        "image": "/drag-assets/f1-095-94-option-4.webp",
        "width": 157,
        "height": 34
      },
      {
        "image": "/drag-assets/f1-095-94-option-5.webp",
        "width": 157,
        "height": 35
      },
      {
        "image": "/drag-assets/f1-095-94-option-6.webp",
        "width": 157,
        "height": 34
      }
    ]
  },
  "f1-098-97": {
    "mode": "matching",
    "slots": 3,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-098-97-option-1.webp",
        "width": 92,
        "height": 30
      },
      {
        "image": "/drag-assets/f1-098-97-option-2.webp",
        "width": 92,
        "height": 31
      },
      {
        "image": "/drag-assets/f1-098-97-option-3.webp",
        "width": 92,
        "height": 30
      },
      {
        "image": "/drag-assets/f1-098-97-option-4.webp",
        "width": 92,
        "height": 30
      },
      {
        "image": "/drag-assets/f1-098-97-option-5.webp",
        "width": 92,
        "height": 31
      },
      {
        "image": "/drag-assets/f1-098-97-option-6.webp",
        "width": 92,
        "height": 30
      }
    ]
  },
  "f1-108-107": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-108-107-option-1.webp",
        "width": 132,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-108-107-option-2.webp",
        "width": 132,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-108-107-option-3.webp",
        "width": 132,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-108-107-option-4.webp",
        "width": 132,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-108-107-option-5.webp",
        "width": 132,
        "height": 28
      }
    ]
  },
  "f1-122-121": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-122-121-option-1.webp",
        "width": 250,
        "height": 44
      },
      {
        "image": "/drag-assets/f1-122-121-option-2.webp",
        "width": 250,
        "height": 44
      },
      {
        "image": "/drag-assets/f1-122-121-option-3.webp",
        "width": 250,
        "height": 43
      },
      {
        "image": "/drag-assets/f1-122-121-option-4.webp",
        "width": 250,
        "height": 44
      },
      {
        "image": "/drag-assets/f1-122-121-option-5.webp",
        "width": 250,
        "height": 43
      }
    ]
  },
  "f1-141-140": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-141-140-option-1.webp",
        "width": 165,
        "height": 41
      },
      {
        "image": "/drag-assets/f1-141-140-option-2.webp",
        "width": 165,
        "height": 40
      },
      {
        "image": "/drag-assets/f1-141-140-option-3.webp",
        "width": 165,
        "height": 41
      },
      {
        "image": "/drag-assets/f1-141-140-option-4.webp",
        "width": 165,
        "height": 41
      },
      {
        "image": "/drag-assets/f1-141-140-option-5.webp",
        "width": 165,
        "height": 40
      }
    ]
  },
  "f1-176-175": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-176-175-option-1.webp",
        "width": 148,
        "height": 32
      },
      {
        "image": "/drag-assets/f1-176-175-option-2.webp",
        "width": 148,
        "height": 32
      },
      {
        "image": "/drag-assets/f1-176-175-option-3.webp",
        "width": 148,
        "height": 31
      },
      {
        "image": "/drag-assets/f1-176-175-option-4.webp",
        "width": 148,
        "height": 31
      },
      {
        "image": "/drag-assets/f1-176-175-option-5.webp",
        "width": 148,
        "height": 32
      },
      {
        "image": "/drag-assets/f1-176-175-option-6.webp",
        "width": 148,
        "height": 31
      }
    ]
  },
  "f1-185-184": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-185-184-option-1.webp",
        "width": 350,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-185-184-option-2.webp",
        "width": 350,
        "height": 27
      },
      {
        "image": "/drag-assets/f1-185-184-option-3.webp",
        "width": 350,
        "height": 42
      },
      {
        "image": "/drag-assets/f1-185-184-option-4.webp",
        "width": 350,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-185-184-option-5.webp",
        "width": 350,
        "height": 42
      }
    ]
  },
  "f1-195-194": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-195-194-option-1.webp",
        "width": 348,
        "height": 26
      },
      {
        "image": "/drag-assets/f1-195-194-option-2.webp",
        "width": 348,
        "height": 26
      },
      {
        "image": "/drag-assets/f1-195-194-option-3.webp",
        "width": 348,
        "height": 25
      },
      {
        "image": "/drag-assets/f1-195-194-option-4.webp",
        "width": 348,
        "height": 26
      },
      {
        "image": "/drag-assets/f1-195-194-option-5.webp",
        "width": 348,
        "height": 25
      }
    ]
  },
  "f1-198-197": {
    "mode": "sequence",
    "slots": 4,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-198-197-option-1.webp",
        "width": 350,
        "height": 28
      },
      {
        "image": "/drag-assets/f1-198-197-option-2.webp",
        "width": 350,
        "height": 27
      },
      {
        "image": "/drag-assets/f1-198-197-option-3.webp",
        "width": 350,
        "height": 27
      },
      {
        "image": "/drag-assets/f1-198-197-option-4.webp",
        "width": 350,
        "height": 27
      },
      {
        "image": "/drag-assets/f1-198-197-option-5.webp",
        "width": 350,
        "height": 28
      }
    ]
  },
  "f1-205-204": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-205-204-option-1.webp",
        "width": 348,
        "height": 25
      },
      {
        "image": "/drag-assets/f1-205-204-option-2.webp",
        "width": 348,
        "height": 23
      },
      {
        "image": "/drag-assets/f1-205-204-option-3.webp",
        "width": 348,
        "height": 24
      },
      {
        "image": "/drag-assets/f1-205-204-option-4.webp",
        "width": 348,
        "height": 25
      },
      {
        "image": "/drag-assets/f1-205-204-option-5.webp",
        "width": 348,
        "height": 24
      }
    ]
  },
  "f1-241-240": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-241-240-option-1.webp",
        "width": 333,
        "height": 23
      },
      {
        "image": "/drag-assets/f1-241-240-option-2.webp",
        "width": 333,
        "height": 24
      },
      {
        "image": "/drag-assets/f1-241-240-option-3.webp",
        "width": 333,
        "height": 24
      },
      {
        "image": "/drag-assets/f1-241-240-option-4.webp",
        "width": 333,
        "height": 24
      },
      {
        "image": "/drag-assets/f1-241-240-option-5.webp",
        "width": 333,
        "height": 23
      }
    ]
  },
  "f1-243-242": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-243-242-option-1.webp",
        "width": 332,
        "height": 38
      },
      {
        "image": "/drag-assets/f1-243-242-option-2.webp",
        "width": 332,
        "height": 38
      },
      {
        "image": "/drag-assets/f1-243-242-option-3.webp",
        "width": 332,
        "height": 38
      },
      {
        "image": "/drag-assets/f1-243-242-option-4.webp",
        "width": 332,
        "height": 38
      },
      {
        "image": "/drag-assets/f1-243-242-option-5.webp",
        "width": 332,
        "height": 38
      }
    ]
  },
  "f1-244-243": {
    "mode": "matching",
    "slots": 3,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-244-243-option-1.webp",
        "width": 313,
        "height": 32
      },
      {
        "image": "/drag-assets/f1-244-243-option-2.webp",
        "width": 313,
        "height": 32
      },
      {
        "image": "/drag-assets/f1-244-243-option-3.webp",
        "width": 313,
        "height": 32
      },
      {
        "image": "/drag-assets/f1-244-243-option-4.webp",
        "width": 313,
        "height": 32
      }
    ]
  },
  "f1-246-245": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-246-245-option-1.webp",
        "width": 226,
        "height": 42
      },
      {
        "image": "/drag-assets/f1-246-245-option-2.webp",
        "width": 226,
        "height": 41
      },
      {
        "image": "/drag-assets/f1-246-245-option-3.webp",
        "width": 226,
        "height": 41
      },
      {
        "image": "/drag-assets/f1-246-245-option-4.webp",
        "width": 226,
        "height": 42
      }
    ]
  },
  "f1-250-249": {
    "mode": "matching",
    "slots": 3,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-250-249-option-1.webp",
        "width": 173,
        "height": 45
      },
      {
        "image": "/drag-assets/f1-250-249-option-2.webp",
        "width": 173,
        "height": 45
      },
      {
        "image": "/drag-assets/f1-250-249-option-3.webp",
        "width": 173,
        "height": 45
      },
      {
        "image": "/drag-assets/f1-250-249-option-4.webp",
        "width": 173,
        "height": 45
      }
    ]
  },
  "f1-262-261": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-262-261-option-1.webp",
        "width": 192,
        "height": 34
      },
      {
        "image": "/drag-assets/f1-262-261-option-2.webp",
        "width": 192,
        "height": 33
      },
      {
        "image": "/drag-assets/f1-262-261-option-3.webp",
        "width": 192,
        "height": 34
      },
      {
        "image": "/drag-assets/f1-262-261-option-4.webp",
        "width": 192,
        "height": 33
      },
      {
        "image": "/drag-assets/f1-262-261-option-5.webp",
        "width": 192,
        "height": 33
      }
    ]
  },
  "f1-280-279": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-280-279-option-1.webp",
        "width": 192,
        "height": 36
      },
      {
        "image": "/drag-assets/f1-280-279-option-2.webp",
        "width": 192,
        "height": 36
      },
      {
        "image": "/drag-assets/f1-280-279-option-3.webp",
        "width": 192,
        "height": 36
      },
      {
        "image": "/drag-assets/f1-280-279-option-4.webp",
        "width": 192,
        "height": 35
      },
      {
        "image": "/drag-assets/f1-280-279-option-5.webp",
        "width": 192,
        "height": 35
      }
    ]
  },
  "f1-284-283": {
    "mode": "sequence",
    "slots": 4,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-284-283-option-1.webp",
        "width": 320,
        "height": 49
      },
      {
        "image": "/drag-assets/f1-284-283-option-2.webp",
        "width": 320,
        "height": 49
      },
      {
        "image": "/drag-assets/f1-284-283-option-3.webp",
        "width": 320,
        "height": 41
      },
      {
        "image": "/drag-assets/f1-284-283-option-4.webp",
        "width": 320,
        "height": 41
      },
      {
        "image": "/drag-assets/f1-284-283-option-5.webp",
        "width": 320,
        "height": 41
      }
    ]
  },
  "f1-290-289": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-290-289-option-1.webp",
        "width": 209,
        "height": 44
      },
      {
        "image": "/drag-assets/f1-290-289-option-2.webp",
        "width": 209,
        "height": 43
      },
      {
        "image": "/drag-assets/f1-290-289-option-3.webp",
        "width": 209,
        "height": 43
      },
      {
        "image": "/drag-assets/f1-290-289-option-4.webp",
        "width": 209,
        "height": 43
      },
      {
        "image": "/drag-assets/f1-290-289-option-5.webp",
        "width": 209,
        "height": 43
      }
    ]
  },
  "f1-300-299": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-300-299-option-1.webp",
        "width": 224,
        "height": 42
      },
      {
        "image": "/drag-assets/f1-300-299-option-2.webp",
        "width": 224,
        "height": 41
      },
      {
        "image": "/drag-assets/f1-300-299-option-3.webp",
        "width": 224,
        "height": 41
      },
      {
        "image": "/drag-assets/f1-300-299-option-4.webp",
        "width": 224,
        "height": 41
      },
      {
        "image": "/drag-assets/f1-300-299-option-5.webp",
        "width": 224,
        "height": 40
      },
      {
        "image": "/drag-assets/f1-300-299-option-6.webp",
        "width": 224,
        "height": 41
      }
    ]
  },
  "f1-306-305": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-306-305-option-1.webp",
        "width": 150,
        "height": 45
      },
      {
        "image": "/drag-assets/f1-306-305-option-2.webp",
        "width": 150,
        "height": 45
      },
      {
        "image": "/drag-assets/f1-306-305-option-3.webp",
        "width": 150,
        "height": 45
      },
      {
        "image": "/drag-assets/f1-306-305-option-4.webp",
        "width": 150,
        "height": 45
      }
    ]
  },
  "f1-319-318": {
    "mode": "matching",
    "slots": 3,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f1-319-318-option-1.webp",
        "width": 162,
        "height": 43
      },
      {
        "image": "/drag-assets/f1-319-318-option-2.webp",
        "width": 162,
        "height": 43
      },
      {
        "image": "/drag-assets/f1-319-318-option-3.webp",
        "width": 162,
        "height": 44
      },
      {
        "image": "/drag-assets/f1-319-318-option-4.webp",
        "width": 162,
        "height": 43
      },
      {
        "image": "/drag-assets/f1-319-318-option-5.webp",
        "width": 162,
        "height": 43
      },
      {
        "image": "/drag-assets/f1-319-318-option-6.webp",
        "width": 162,
        "height": 42
      }
    ]
  },
  "f1-320-319": {
    "mode": "sequence",
    "slots": 4,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-320-319-option-1.webp",
        "width": 334,
        "height": 46
      },
      {
        "image": "/drag-assets/f1-320-319-option-2.webp",
        "width": 334,
        "height": 46
      },
      {
        "image": "/drag-assets/f1-320-319-option-3.webp",
        "width": 334,
        "height": 46
      },
      {
        "image": "/drag-assets/f1-320-319-option-4.webp",
        "width": 334,
        "height": 46
      },
      {
        "image": "/drag-assets/f1-320-319-option-5.webp",
        "width": 334,
        "height": 47
      }
    ]
  },
  "f1-334-333": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-334-333-option-1.webp",
        "width": 352,
        "height": 26
      },
      {
        "image": "/drag-assets/f1-334-333-option-2.webp",
        "width": 352,
        "height": 26
      },
      {
        "image": "/drag-assets/f1-334-333-option-3.webp",
        "width": 352,
        "height": 26
      },
      {
        "image": "/drag-assets/f1-334-333-option-4.webp",
        "width": 352,
        "height": 26
      }
    ]
  },
  "f1-347-346": {
    "mode": "sequence",
    "slots": 4,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f1-347-346-option-1.webp",
        "width": 349,
        "height": 48
      },
      {
        "image": "/drag-assets/f1-347-346-option-2.webp",
        "width": 349,
        "height": 47
      },
      {
        "image": "/drag-assets/f1-347-346-option-3.webp",
        "width": 349,
        "height": 32
      },
      {
        "image": "/drag-assets/f1-347-346-option-4.webp",
        "width": 349,
        "height": 31
      },
      {
        "image": "/drag-assets/f1-347-346-option-5.webp",
        "width": 349,
        "height": 32
      }
    ]
  },
  "f2-004-372": {
    "mode": "sequence",
    "slots": 4,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-004-372-option-1.webp",
        "width": 242,
        "height": 32
      },
      {
        "image": "/drag-assets/f2-004-372-option-2.webp",
        "width": 242,
        "height": 22
      },
      {
        "image": "/drag-assets/f2-004-372-option-3.webp",
        "width": 242,
        "height": 32
      },
      {
        "image": "/drag-assets/f2-004-372-option-4.webp",
        "width": 242,
        "height": 22
      },
      {
        "image": "/drag-assets/f2-004-372-option-5.webp",
        "width": 242,
        "height": 22
      }
    ]
  },
  "f2-026-386": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-026-386-option-1.webp",
        "width": 262,
        "height": 28
      },
      {
        "image": "/drag-assets/f2-026-386-option-2.webp",
        "width": 262,
        "height": 34
      },
      {
        "image": "/drag-assets/f2-026-386-option-3.webp",
        "width": 262,
        "height": 29
      },
      {
        "image": "/drag-assets/f2-026-386-option-4.webp",
        "width": 262,
        "height": 28
      },
      {
        "image": "/drag-assets/f2-026-386-option-5.webp",
        "width": 262,
        "height": 29
      },
      {
        "image": "/drag-assets/f2-026-386-option-6.webp",
        "width": 262,
        "height": 28
      }
    ]
  },
  "f2-059-397": {
    "mode": "sequence",
    "slots": 4,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-059-397-option-1.webp",
        "width": 291,
        "height": 19
      },
      {
        "image": "/drag-assets/f2-059-397-option-2.webp",
        "width": 291,
        "height": 19
      },
      {
        "image": "/drag-assets/f2-059-397-option-3.webp",
        "width": 291,
        "height": 22
      },
      {
        "image": "/drag-assets/f2-059-397-option-4.webp",
        "width": 291,
        "height": 22
      },
      {
        "image": "/drag-assets/f2-059-397-option-5.webp",
        "width": 291,
        "height": 19
      }
    ]
  },
  "f2-100-407": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-100-407-option-1.webp",
        "width": 241,
        "height": 28
      },
      {
        "image": "/drag-assets/f2-100-407-option-2.webp",
        "width": 241,
        "height": 27
      },
      {
        "image": "/drag-assets/f2-100-407-option-3.webp",
        "width": 241,
        "height": 27
      },
      {
        "image": "/drag-assets/f2-100-407-option-4.webp",
        "width": 241,
        "height": 28
      },
      {
        "image": "/drag-assets/f2-100-407-option-5.webp",
        "width": 241,
        "height": 28
      }
    ]
  },
  "f2-157-426": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-157-426-option-1.webp",
        "width": 250,
        "height": 21
      },
      {
        "image": "/drag-assets/f2-157-426-option-2.webp",
        "width": 250,
        "height": 20
      },
      {
        "image": "/drag-assets/f2-157-426-option-3.webp",
        "width": 250,
        "height": 20
      },
      {
        "image": "/drag-assets/f2-157-426-option-4.webp",
        "width": 250,
        "height": 29
      },
      {
        "image": "/drag-assets/f2-157-426-option-5.webp",
        "width": 250,
        "height": 29
      },
      {
        "image": "/drag-assets/f2-157-426-option-6.webp",
        "width": 250,
        "height": 20
      }
    ]
  },
  "f2-177-434": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f2-177-434-option-1.webp",
        "width": 142,
        "height": 23
      },
      {
        "image": "/drag-assets/f2-177-434-option-2.webp",
        "width": 142,
        "height": 23
      },
      {
        "image": "/drag-assets/f2-177-434-option-3.webp",
        "width": 142,
        "height": 23
      },
      {
        "image": "/drag-assets/f2-177-434-option-4.webp",
        "width": 142,
        "height": 23
      },
      {
        "image": "/drag-assets/f2-177-434-option-5.webp",
        "width": 142,
        "height": 23
      }
    ]
  },
  "f2-201-443": {
    "mode": "sequence",
    "slots": 4,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-201-443-option-1.webp",
        "width": 227,
        "height": 35
      },
      {
        "image": "/drag-assets/f2-201-443-option-2.webp",
        "width": 227,
        "height": 51
      },
      {
        "image": "/drag-assets/f2-201-443-option-3.webp",
        "width": 227,
        "height": 35
      },
      {
        "image": "/drag-assets/f2-201-443-option-4.webp",
        "width": 227,
        "height": 35
      },
      {
        "image": "/drag-assets/f2-201-443-option-5.webp",
        "width": 227,
        "height": 44
      },
      {
        "image": "/drag-assets/f2-201-443-option-6.webp",
        "width": 227,
        "height": 35
      },
      {
        "image": "/drag-assets/f2-201-443-option-7.webp",
        "width": 227,
        "height": 35
      }
    ]
  },
  "f2-214-448": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-214-448-option-1.webp",
        "width": 247,
        "height": 35
      },
      {
        "image": "/drag-assets/f2-214-448-option-2.webp",
        "width": 247,
        "height": 27
      },
      {
        "image": "/drag-assets/f2-214-448-option-3.webp",
        "width": 247,
        "height": 27
      },
      {
        "image": "/drag-assets/f2-214-448-option-4.webp",
        "width": 247,
        "height": 27
      },
      {
        "image": "/drag-assets/f2-214-448-option-5.webp",
        "width": 247,
        "height": 27
      },
      {
        "image": "/drag-assets/f2-214-448-option-6.webp",
        "width": 247,
        "height": 27
      }
    ]
  },
  "f2-232-454": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-232-454-option-1.webp",
        "width": 433,
        "height": 31
      },
      {
        "image": "/drag-assets/f2-232-454-option-2.webp",
        "width": 433,
        "height": 31
      },
      {
        "image": "/drag-assets/f2-232-454-option-3.webp",
        "width": 433,
        "height": 29
      },
      {
        "image": "/drag-assets/f2-232-454-option-4.webp",
        "width": 433,
        "height": 30
      },
      {
        "image": "/drag-assets/f2-232-454-option-5.webp",
        "width": 433,
        "height": 51
      },
      {
        "image": "/drag-assets/f2-232-454-option-6.webp",
        "width": 433,
        "height": 31
      },
      {
        "image": "/drag-assets/f2-232-454-option-7.webp",
        "width": 433,
        "height": 31
      }
    ]
  },
  "f2-281-468": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-281-468-option-1.webp",
        "width": 240,
        "height": 21
      },
      {
        "image": "/drag-assets/f2-281-468-option-2.webp",
        "width": 240,
        "height": 23
      },
      {
        "image": "/drag-assets/f2-281-468-option-3.webp",
        "width": 240,
        "height": 22
      },
      {
        "image": "/drag-assets/f2-281-468-option-4.webp",
        "width": 240,
        "height": 22
      },
      {
        "image": "/drag-assets/f2-281-468-option-5.webp",
        "width": 240,
        "height": 20
      }
    ]
  },
  "f2-318-479": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-318-479-option-1.webp",
        "width": 81,
        "height": 17
      },
      {
        "image": "/drag-assets/f2-318-479-option-2.webp",
        "width": 81,
        "height": 18
      },
      {
        "image": "/drag-assets/f2-318-479-option-3.webp",
        "width": 81,
        "height": 23
      },
      {
        "image": "/drag-assets/f2-318-479-option-4.webp",
        "width": 81,
        "height": 17
      },
      {
        "image": "/drag-assets/f2-318-479-option-5.webp",
        "width": 81,
        "height": 17
      }
    ]
  },
  "f2-323-480": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-323-480-option-1.webp",
        "width": 145,
        "height": 28
      },
      {
        "image": "/drag-assets/f2-323-480-option-2.webp",
        "width": 145,
        "height": 27
      },
      {
        "image": "/drag-assets/f2-323-480-option-3.webp",
        "width": 145,
        "height": 28
      },
      {
        "image": "/drag-assets/f2-323-480-option-4.webp",
        "width": 145,
        "height": 28
      }
    ]
  },
  "f2-331-482": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f2-331-482-option-1.webp",
        "width": 89,
        "height": 18
      },
      {
        "image": "/drag-assets/f2-331-482-option-2.webp",
        "width": 89,
        "height": 19
      },
      {
        "image": "/drag-assets/f2-331-482-option-3.webp",
        "width": 89,
        "height": 19
      },
      {
        "image": "/drag-assets/f2-331-482-option-4.webp",
        "width": 89,
        "height": 19
      }
    ]
  },
  "f2-368-495": {
    "mode": "sequence",
    "slots": 3,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-368-495-option-1.webp",
        "width": 244,
        "height": 18
      },
      {
        "image": "/drag-assets/f2-368-495-option-2.webp",
        "width": 244,
        "height": 19
      },
      {
        "image": "/drag-assets/f2-368-495-option-3.webp",
        "width": 244,
        "height": 19
      },
      {
        "image": "/drag-assets/f2-368-495-option-4.webp",
        "width": 244,
        "height": 16
      }
    ]
  },
  "f2-396-504": {
    "mode": "matching",
    "slots": 3,
    "allowReuse": true,
    "options": [
      {
        "image": "/drag-assets/f2-396-504-option-1.webp",
        "width": 58,
        "height": 20
      },
      {
        "image": "/drag-assets/f2-396-504-option-2.webp",
        "width": 58,
        "height": 20
      },
      {
        "image": "/drag-assets/f2-396-504-option-3.webp",
        "width": 58,
        "height": 20
      },
      {
        "image": "/drag-assets/f2-396-504-option-4.webp",
        "width": 58,
        "height": 20
      },
      {
        "image": "/drag-assets/f2-396-504-option-5.webp",
        "width": 58,
        "height": 20
      },
      {
        "image": "/drag-assets/f2-396-504-option-6.webp",
        "width": 58,
        "height": 20
      }
    ]
  },
  "f2-403-506": {
    "mode": "matching",
    "slots": 2,
    "allowReuse": false,
    "options": [
      {
        "image": "/drag-assets/f2-403-506-option-1.webp",
        "width": 106,
        "height": 17
      },
      {
        "image": "/drag-assets/f2-403-506-option-2.webp",
        "width": 106,
        "height": 17
      },
      {
        "image": "/drag-assets/f2-403-506-option-3.webp",
        "width": 106,
        "height": 17
      },
      {
        "image": "/drag-assets/f2-403-506-option-4.webp",
        "width": 106,
        "height": 16
      },
      {
        "image": "/drag-assets/f2-403-506-option-5.webp",
        "width": 106,
        "height": 17
      }
    ]
  }
};
