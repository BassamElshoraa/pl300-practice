// Generated from source choice tiles and reviewed explanations.
// Unresolved visual items are deliberately excluded from scored exams.
import { reviewedNativeKeys as nativeEarly } from './reviewed-lessons/native-keys-001-220-301-380.ts';
import {
  reviewedNativeKeys as nativeMiddle,
  reviewedDragKeys,
} from './reviewed-lessons/native-keys-221-300.ts';
import { reviewedNativeKeys as nativeLater } from './reviewed-lessons/native-keys-381-494.ts';

export const managedAutoGradingKeys: Record<string, number[]> = {
  ...nativeEarly,
  ...Object.fromEntries(
    Object.entries(nativeMiddle).filter(
      ([id]) => !['f1-278-277', 'f1-287-286'].includes(id),
    ),
  ),
  ...reviewedDragKeys,
  ...nativeLater,
  'f1-006-5': [1, 3],
  'f1-009-8': [3, 4, 1],
  'f1-015-14': [0, 2, 1],
  'f1-017-16': [1, 3, 0, 4],
  'f1-019-18': [0, 1, 2],
  'f1-028-27': [2, 1],
  'f1-065-64': [4, 3, 0, 1],
  'f1-073-72': [2, 4, 1, 5],
  'f1-088-87': [1, 2, 3],
  'f1-091-90': [5, 1],
  'f1-095-94': [5, 4, 0],
  'f1-098-97': [3, 1, 2],
  'f1-108-107': [2, 1],
  'f1-122-121': [3, 1],
  'f1-141-140': [2, 0],
  'f1-176-175': [1, 2],
  'f1-185-184': [0, 3, 2],
  'f1-195-194': [2, 1, 0],
  'f1-198-197': [0, 1, 3, 4],
  'f1-205-204': [1, 2, 3],
  'f1-241-240': [3, 0, 1],
  'f1-243-242': [2, 4, 1],
  'f1-244-243': [20003, 20001],
  'f1-246-245': [1, 3],
  'f1-250-249': [1, 3, 2],
  'f1-262-261': [3, 4],
  'f1-280-279': [4, 1],
  'f1-290-289': [1, 3],
  'f1-300-299': [3, 4, 1],
  'f1-306-305': [2, 1],
  'f1-319-318': [1, 2, 0],
  'f1-320-319': [4, 3, 2, 0],
  'f1-334-333': [3, 0, 2],
  'f1-347-346': [3, 1, 4, 2],
  'f2-059-397': [1, 3, 0, 4],
  'f2-026-386': [3, 5, 6],
  'f2-177-434': [3, 1],
  'f2-201-443': [2, 4, 0, 6],
  'f2-318-479': [2, 1],
  'f2-323-480': [1, 3],
  'f2-403-506': [3, 1],
};

export function hasManagedAutoGradingKey(questionId: string) {
  return Boolean(managedAutoGradingKeys[questionId]?.length);
}
