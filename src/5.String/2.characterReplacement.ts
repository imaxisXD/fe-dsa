/**
 * 424. Longest Repeating Character Replacement
 * https://leetcode.com/problems/longest-repeating-character-replacement/
 */

// Two pointers - O(n) time; O(1) space;
function characterReplacement(s: string, k: number): number {
  let longest = 0;
  const map = new Map<string, number>(); // O(26) space at most -> O(1) space
  let l = 0;
  for (let r = 0; r < s.length; r++) {
    const char = s[r];
    map.set(char, (map.get(char) ?? 0) + 1);
    let maxOccurance = 0;
    let totalOccurance = 0;
    map.forEach((val) => {
      maxOccurance = Math.max(maxOccurance, val);
      totalOccurance += val;
    });
    const needReplacementCount = totalOccurance - maxOccurance;
    if (needReplacementCount <= k) {
      const substrLength = r - l + 1;
      longest = Math.max(longest, substrLength);
    } else {
      const lChar = s[l];
      map.set(lChar, map.get(lChar)! - 1);
      l++;
    }
  }
  return longest;
}

// Brute force - O(n^2) time; O(1) space
function characterReplacement2(s: string, k: number): number {
  let maxLength = 1;

  // map will have at most 26 key value pairs (26 letters), doesn't scale with n
  // O(26) space, treat as O(1) space
  const map = new Map<string, number>();

  for (let i = 0; i < s.length - 1; i++) {
    map.clear();
    const char = s[i];
    map.set(char, 1);

    for (let j = i + 1; j < s.length; j++) {
      const char2 = s[j];
      map.set(char2, (map.get(char2) ?? 0) + 1);

      let maxOccurance: number = 0;
      for (const [_, val] of map) {
        // map will have at most 26 key value pairs, O(26) time treat as O(1) time
        maxOccurance = Math.max(maxOccurance, val);
      }

      const substrLength = j - i + 1;
      if (substrLength - maxOccurance <= k) {
        maxLength = Math.max(maxLength, substrLength);
      }
    }
  }

  return maxLength;
}
