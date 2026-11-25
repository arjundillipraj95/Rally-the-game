# MATCH1 The full-match check (tracker block 6)
Status: built 25 Nov on launch26; the friends match is Arjun's part

`store/r_MATCH1.mjs`: three phones (Arjun hosts, Ravi and Mira join from friends), Mira closes her game at 1:00, the host's
clock runs fast to 10:00. Checks: 12 captains; friends on the host's side; the leaver's army goes to the computer; the
Sceptre lands and counts 5; both phones end with the same winner and the same results table (12 rows). ALL PASS.

Found and fixed on the way:
- Online battles were 4/8/12 captains by Solo/Duo/Trio. Arjun 18 Nov: every match is 12; Solo/Duo/Trio is only the party size.
  online/src/index.js: every lobby is `ROOM_FMT` 2 (12 seats); the party-size check stays. Client: `matchHost` and
  offline Play start with duo [2,2,2,2]; Crown ranks still go by the party size you chose (`S.playFmt`); lobby headers
  read "The Crown · n/12". (The online service deploys from main.)
- A friend joining your battle late sat on an enemy side: now he takes a computer seat on yours (`m_join` seats near him).
- Gold on joined phones' results was truncated (off by 1): sent rounded.
Also pass: crown2sim, crown2online (roles off and on), r_F22, r_F23, r_F24.
