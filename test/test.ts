import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Myfirstlayer2SBT Test", function () {
  async function deployixture() {
    const [owner, learner] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("Myfirstlayer2SBT");
    const SBT = await factory.deploy();

    return {
      SBT,
      owner,
      learner,
    };
  }

  it("#1 - Should set the right owner", async function () {
    const { SBT, owner } = await loadFixture(deployixture);
    expect(await SBT.owner()).to.equal(owner.address);
  });

  it("#1 - Mint", async function () {
    const { SBT, learner } = await loadFixture(deployixture);

    // empty check
    await expect(SBT.connect(learner).mint("")).to.revertedWith(
      "The svg string is empty."
    );

    const svg =
      "data:application/json;base64,eyJuYW1lIjoiVW5pc3dhcCAtIDAuMyUgLSBuZXdWMy9NQVRJQyAtIDkwMjMuMTw+MTUwMjYiLCAiZGVzY3JpcHRpb24iOiJUaGlzIE5GVCByZXByZXNlbnRzIGEgbGlxdWlkaXR5IHBvc2l0aW9uIGluIGEgVW5pc3dhcCBWMyBuZXdWMy1NQVRJQyBwb29sLiBUaGUgb3duZXIgb2YgdGhpcyBORlQgY2FuIG1vZGlmeSBvciByZWRlZW0gdGhlIHBvc2l0aW9uLlxuXG5Qb29sIEFkZHJlc3M6IDB4MWIzODg0ZWVlM2EyODYzODk4ZmVlYjgxNGY1NmJlMGVlZjQ1NWIyY1xubmV3VjMgQWRkcmVzczogMHgwYmFkZWY4MzIwZTdlMmM0ODRkNjQ2NjRmNzM4MGU0YjU2NTQ2MmQ1XG5NQVRJQyBBZGRyZXNzOiAweDljM2M5MjgzZDNlNDQ4NTQ2OTdjZDIyZDNmYWEyNDBjZmIwMzI4ODlcbkZlZSBUaWVyOiAwLjMlXG5Ub2tlbiBJRDogNDY4XG5cbuKaoO+4jyBESVNDTEFJTUVSOiBEdWUgZGlsaWdlbmNlIGlzIGltcGVyYXRpdmUgd2hlbiBhc3Nlc3NpbmcgdGhpcyBORlQuIE1ha2Ugc3VyZSB0b2tlbiBhZGRyZXNzZXMgbWF0Y2ggdGhlIGV4cGVjdGVkIHRva2VucywgYXMgdG9rZW4gc3ltYm9scyBtYXkgYmUgaW1pdGF0ZWQuIiwgImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwaU1qa3dJaUJvWldsbmFIUTlJalV3TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJREk1TUNBMU1EQWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SWdlRzFzYm5NNmVHeHBibXM5SjJoMGRIQTZMeTkzZDNjdWR6TXViM0puTHpFNU9Ua3ZlR3hwYm1zblBqeGtaV1p6UGp4bWFXeDBaWElnYVdROUltWXhJajQ4Wm1WSmJXRm5aU0J5WlhOMWJIUTlJbkF3SWlCNGJHbHVhenBvY21WbVBTSmtZWFJoT21sdFlXZGxMM04yWnl0NGJXdzdZbUZ6WlRZMExGQklUakphZVVJellWZFNNR0ZFTUc1TmFtdDNTbmxDYjFwWGJHNWhTRkU1U25wVmQwMURZMmRrYld4c1pEQktkbVZFTUc1TlEwRjNTVVJKTlUxRFFURk5SRUZ1U1Vob2RHSkhOWHBRVTJSdlpFaFNkMDlwT0haa00yUXpURzVqZWt4dE9YbGFlVGg1VFVSQmQwd3pUakphZVdNclVFaEtiRmt6VVdka01teHJaRWRuT1VwNlNUVk5TRUkwU25sQ2IxcFhiRzVoU0ZFNVNucFZkMDFJUWpSS2VVSnRZVmQ0YzFCVFkycE5SMHBvV2tkV2JVcDVPQ3RRUXpsNlpHMWpLeUl2UGp4bVpVbHRZV2RsSUhKbGMzVnNkRDBpY0RFaUlIaHNhVzVyT21oeVpXWTlJbVJoZEdFNmFXMWhaMlV2YzNabkszaHRiRHRpWVhObE5qUXNVRWhPTWxwNVFqTmhWMUl3WVVRd2JrMXFhM2RLZVVKdldsZHNibUZJVVRsS2VsVjNUVU5qWjJSdGJHeGtNRXAyWlVRd2JrMURRWGRKUkVrMVRVTkJNVTFFUVc1SlNHaDBZa2MxZWxCVFpHOWtTRkozVDJrNGRtUXpaRE5NYm1ONlRHMDVlVnA1T0hsTlJFRjNURE5PTWxwNVl5dFFSMDV3WTIxT2MxcFRRbXBsUkRCdVRsUm5ia2xIVGpWUVUyTjVUMVJSYmtsSVNUbEtla1Y1VFVoQ05FcDVRbTFoVjNoelVGTmphazlYVFhwWmVtdDVTbms0SzFCRE9YcGtiV01ySWk4K1BHWmxTVzFoWjJVZ2NtVnpkV3gwUFNKd01pSWdlR3hwYm1zNmFISmxaajBpWkdGMFlUcHBiV0ZuWlM5emRtY3JlRzFzTzJKaGMyVTJOQ3hRU0U0eVdubENNMkZYVWpCaFJEQnVUV3ByZDBwNVFtOWFWMnh1WVVoUk9VcDZWWGROUTJOblpHMXNiR1F3U25abFJEQnVUVU5CZDBsRVNUVk5RMEV4VFVSQmJrbElhSFJpUnpWNlVGTmtiMlJJVW5kUGFUaDJaRE5rTTB4dVkzcE1iVGw1V25rNGVVMUVRWGRNTTA0eVdubGpLMUJIVG5CamJVNXpXbE5DYW1WRU1HNU5WR2Q1U25sQ2FtVlVNRzVOVkVFMVNubENlVkJUWTNoTmFrSjNaVU5qWjFwdGJITmlSREJ1U1hwVk1FNXFTbXRPVTJOMlVHcDNkbU16V201UVp6MDlJaUF2UGp4bVpVbHRZV2RsSUhKbGMzVnNkRDBpY0RNaUlIaHNhVzVyT21oeVpXWTlJbVJoZEdFNmFXMWhaMlV2YzNabkszaHRiRHRpWVhObE5qUXNVRWhPTWxwNVFqTmhWMUl3WVVRd2JrMXFhM2RLZVVKdldsZHNibUZJVVRsS2VsVjNUVU5qWjJSdGJHeGtNRXAyWlVRd2JrMURRWGRKUkVrMVRVTkJNVTFFUVc1SlNHaDBZa2MxZWxCVFpHOWtTRkozVDJrNGRtUXpaRE5NYm1ONlRHMDVlVnA1T0hsTlJFRjNURE5PTWxwNVl5dFFSMDV3WTIxT2MxcFRRbXBsUkRCdVRXcEZNa3A1UW1wbFZEQnVUVlJCZDBwNVFubFFVMk40VFVSQ2QyVkRZMmRhYld4ellrUXdia2w2UVhwTmFtYzBUMU5qZGxCcWQzWmpNMXB1VUdjOVBTSWdMejQ4Wm1WQ2JHVnVaQ0J0YjJSbFBTSnZkbVZ5YkdGNUlpQnBiajBpY0RBaUlHbHVNajBpY0RFaUlDOCtQR1psUW14bGJtUWdiVzlrWlQwaVpYaGpiSFZ6YVc5dUlpQnBiakk5SW5BeUlpQXZQanhtWlVKc1pXNWtJRzF2WkdVOUltOTJaWEpzWVhraUlHbHVNajBpY0RNaUlISmxjM1ZzZEQwaVlteGxibVJQZFhRaUlDOCtQR1psUjJGMWMzTnBZVzVDYkhWeUlHbHVQU0ppYkdWdVpFOTFkQ0lnYzNSa1JHVjJhV0YwYVc5dVBTSTBNaUlnTHo0OEwyWnBiSFJsY2o0Z1BHTnNhWEJRWVhSb0lHbGtQU0pqYjNKdVpYSnpJajQ4Y21WamRDQjNhV1IwYUQwaU1qa3dJaUJvWldsbmFIUTlJalV3TUNJZ2NuZzlJalF5SWlCeWVUMGlORElpSUM4K1BDOWpiR2x3VUdGMGFENDhjR0YwYUNCcFpEMGlkR1Y0ZEMxd1lYUm9MV0VpSUdROUlrMDBNQ0F4TWlCSU1qVXdJRUV5T0NBeU9DQXdJREFnTVNBeU56Z2dOREFnVmpRMk1DQkJNamdnTWpnZ01DQXdJREVnTWpVd0lEUTRPQ0JJTkRBZ1FUSTRJREk0SURBZ01DQXhJREV5SURRMk1DQldOREFnUVRJNElESTRJREFnTUNBeElEUXdJREV5SUhvaUlDOCtQSEJoZEdnZ2FXUTlJbTFwYm1sdFlYQWlJR1E5SWsweU16UWdORFEwUXpJek5DQTBOVGN1T1RRNUlESTBNaTR5TVNBME5qTWdNalV6SURRMk15SWdMejQ4Wm1sc2RHVnlJR2xrUFNKMGIzQXRjbVZuYVc5dUxXSnNkWElpUGp4bVpVZGhkWE56YVdGdVFteDFjaUJwYmowaVUyOTFjbU5sUjNKaGNHaHBZeUlnYzNSa1JHVjJhV0YwYVc5dVBTSXlOQ0lnTHo0OEwyWnBiSFJsY2o0OGJHbHVaV0Z5UjNKaFpHbGxiblFnYVdROUltZHlZV1F0ZFhBaUlIZ3hQU0l4SWlCNE1qMGlNQ0lnZVRFOUlqRWlJSGt5UFNJd0lqNDhjM1J2Y0NCdlptWnpaWFE5SWpBdU1DSWdjM1J2Y0MxamIyeHZjajBpZDJocGRHVWlJSE4wYjNBdGIzQmhZMmwwZVQwaU1TSWdMejQ4YzNSdmNDQnZabVp6WlhROUlpNDVJaUJ6ZEc5d0xXTnZiRzl5UFNKM2FHbDBaU0lnYzNSdmNDMXZjR0ZqYVhSNVBTSXdJaUF2UGp3dmJHbHVaV0Z5UjNKaFpHbGxiblErUEd4cGJtVmhja2R5WVdScFpXNTBJR2xrUFNKbmNtRmtMV1J2ZDI0aUlIZ3hQU0l3SWlCNE1qMGlNU0lnZVRFOUlqQWlJSGt5UFNJeElqNDhjM1J2Y0NCdlptWnpaWFE5SWpBdU1DSWdjM1J2Y0MxamIyeHZjajBpZDJocGRHVWlJSE4wYjNBdGIzQmhZMmwwZVQwaU1TSWdMejQ4YzNSdmNDQnZabVp6WlhROUlqQXVPU0lnYzNSdmNDMWpiMnh2Y2owaWQyaHBkR1VpSUhOMGIzQXRiM0JoWTJsMGVUMGlNQ0lnTHo0OEwyeHBibVZoY2tkeVlXUnBaVzUwUGp4dFlYTnJJR2xrUFNKbVlXUmxMWFZ3SWlCdFlYTnJRMjl1ZEdWdWRGVnVhWFJ6UFNKdlltcGxZM1JDYjNWdVpHbHVaMEp2ZUNJK1BISmxZM1FnZDJsa2RHZzlJakVpSUdobGFXZG9kRDBpTVNJZ1ptbHNiRDBpZFhKc0tDTm5jbUZrTFhWd0tTSWdMejQ4TDIxaGMycytQRzFoYzJzZ2FXUTlJbVpoWkdVdFpHOTNiaUlnYldGemEwTnZiblJsYm5SVmJtbDBjejBpYjJKcVpXTjBRbTkxYm1ScGJtZENiM2dpUGp4eVpXTjBJSGRwWkhSb1BTSXhJaUJvWldsbmFIUTlJakVpSUdacGJHdzlJblZ5YkNnalozSmhaQzFrYjNkdUtTSWdMejQ4TDIxaGMycytQRzFoYzJzZ2FXUTlJbTV2Ym1VaUlHMWhjMnREYjI1MFpXNTBWVzVwZEhNOUltOWlhbVZqZEVKdmRXNWthVzVuUW05NElqNDhjbVZqZENCM2FXUjBhRDBpTVNJZ2FHVnBaMmgwUFNJeElpQm1hV3hzUFNKM2FHbDBaU0lnTHo0OEwyMWhjMnMrUEd4cGJtVmhja2R5WVdScFpXNTBJR2xrUFNKbmNtRmtMWE41YldKdmJDSStQSE4wYjNBZ2IyWm1jMlYwUFNJd0xqY2lJSE4wYjNBdFkyOXNiM0k5SW5kb2FYUmxJaUJ6ZEc5d0xXOXdZV05wZEhrOUlqRWlJQzgrUEhOMGIzQWdiMlptYzJWMFBTSXVPVFVpSUhOMGIzQXRZMjlzYjNJOUluZG9hWFJsSWlCemRHOXdMVzl3WVdOcGRIazlJakFpSUM4K1BDOXNhVzVsWVhKSGNtRmthV1Z1ZEQ0OGJXRnpheUJwWkQwaVptRmtaUzF6ZVcxaWIyd2lJRzFoYzJ0RGIyNTBaVzUwVlc1cGRITTlJblZ6WlhKVGNHRmpaVTl1VlhObElqNDhjbVZqZENCM2FXUjBhRDBpTWprd2NIZ2lJR2hsYVdkb2REMGlNakF3Y0hnaUlHWnBiR3c5SW5WeWJDZ2paM0poWkMxemVXMWliMndwSWlBdlBqd3ZiV0Z6YXo0OEwyUmxabk0rUEdjZ1kyeHBjQzF3WVhSb1BTSjFjbXdvSTJOdmNtNWxjbk1wSWo0OGNtVmpkQ0JtYVd4c1BTSXdZbUZrWldZaUlIZzlJakJ3ZUNJZ2VUMGlNSEI0SWlCM2FXUjBhRDBpTWprd2NIZ2lJR2hsYVdkb2REMGlOVEF3Y0hnaUlDOCtQSEpsWTNRZ2MzUjViR1U5SW1acGJIUmxjam9nZFhKc0tDTm1NU2tpSUhnOUlqQndlQ0lnZVQwaU1IQjRJaUIzYVdSMGFEMGlNamt3Y0hnaUlHaGxhV2RvZEQwaU5UQXdjSGdpSUM4K0lEeG5JSE4wZVd4bFBTSm1hV3gwWlhJNmRYSnNLQ04wYjNBdGNtVm5hVzl1TFdKc2RYSXBPeUIwY21GdWMyWnZjbTA2YzJOaGJHVW9NUzQxS1RzZ2RISmhibk5tYjNKdExXOXlhV2RwYmpwalpXNTBaWElnZEc5d095SStQSEpsWTNRZ1ptbHNiRDBpYm05dVpTSWdlRDBpTUhCNElpQjVQU0l3Y0hnaUlIZHBaSFJvUFNJeU9UQndlQ0lnYUdWcFoyaDBQU0kxTURCd2VDSWdMejQ4Wld4c2FYQnpaU0JqZUQwaU5UQWxJaUJqZVQwaU1IQjRJaUJ5ZUQwaU1UZ3djSGdpSUhKNVBTSXhNakJ3ZUNJZ1ptbHNiRDBpSXpBd01DSWdiM0JoWTJsMGVUMGlNQzQ0TlNJZ0x6NDhMMmMrUEhKbFkzUWdlRDBpTUNJZ2VUMGlNQ0lnZDJsa2RHZzlJakk1TUNJZ2FHVnBaMmgwUFNJMU1EQWlJSEo0UFNJME1pSWdjbms5SWpReUlpQm1hV3hzUFNKeVoySmhLREFzTUN3d0xEQXBJaUJ6ZEhKdmEyVTlJbkpuWW1Fb01qVTFMREkxTlN3eU5UVXNNQzR5S1NJZ0x6NDhMMmMrUEhSbGVIUWdkR1Y0ZEMxeVpXNWtaWEpwYm1jOUltOXdkR2x0YVhwbFUzQmxaV1FpUGp4MFpYaDBVR0YwYUNCemRHRnlkRTltWm5ObGREMGlMVEV3TUNVaUlHWnBiR3c5SW5kb2FYUmxJaUJtYjI1MExXWmhiV2xzZVQwaUowTnZkWEpwWlhJZ1RtVjNKeXdnYlc5dWIzTndZV05sSWlCbWIyNTBMWE5wZW1VOUlqRXdjSGdpSUhoc2FXNXJPbWh5WldZOUlpTjBaWGgwTFhCaGRHZ3RZU0krTUhnNVl6TmpPVEk0TTJRelpUUTBPRFUwTmprM1kyUXlNbVF6Wm1GaE1qUXdZMlppTURNeU9EZzVJT0tBb2lCTlFWUkpReUE4WVc1cGJXRjBaU0JoWkdScGRHbDJaVDBpYzNWdElpQmhkSFJ5YVdKMWRHVk9ZVzFsUFNKemRHRnlkRTltWm5ObGRDSWdabkp2YlQwaU1DVWlJSFJ2UFNJeE1EQWxJaUJpWldkcGJqMGlNSE1pSUdSMWNqMGlNekJ6SWlCeVpYQmxZWFJEYjNWdWREMGlhVzVrWldacGJtbDBaU0lnTHo0OEwzUmxlSFJRWVhSb1BpQThkR1Y0ZEZCaGRHZ2djM1JoY25SUFptWnpaWFE5SWpBbElpQm1hV3hzUFNKM2FHbDBaU0lnWm05dWRDMW1ZVzFwYkhrOUlpZERiM1Z5YVdWeUlFNWxkeWNzSUcxdmJtOXpjR0ZqWlNJZ1ptOXVkQzF6YVhwbFBTSXhNSEI0SWlCNGJHbHVhenBvY21WbVBTSWpkR1Y0ZEMxd1lYUm9MV0VpUGpCNE9XTXpZemt5T0ROa00yVTBORGcxTkRZNU4yTmtNakprTTJaaFlUSTBNR05tWWpBek1qZzRPU0RpZ0tJZ1RVRlVTVU1nUEdGdWFXMWhkR1VnWVdSa2FYUnBkbVU5SW5OMWJTSWdZWFIwY21saWRYUmxUbUZ0WlQwaWMzUmhjblJQWm1aelpYUWlJR1p5YjIwOUlqQWxJaUIwYnowaU1UQXdKU0lnWW1WbmFXNDlJakJ6SWlCa2RYSTlJak13Y3lJZ2NtVndaV0YwUTI5MWJuUTlJbWx1WkdWbWFXNXBkR1VpSUM4K0lEd3ZkR1Y0ZEZCaGRHZytQSFJsZUhSUVlYUm9JSE4wWVhKMFQyWm1jMlYwUFNJMU1DVWlJR1pwYkd3OUluZG9hWFJsSWlCbWIyNTBMV1poYldsc2VUMGlKME52ZFhKcFpYSWdUbVYzSnl3Z2JXOXViM053WVdObElpQm1iMjUwTFhOcGVtVTlJakV3Y0hnaUlIaHNhVzVyT21oeVpXWTlJaU4wWlhoMExYQmhkR2d0WVNJK01IZ3dZbUZrWldZNE16SXdaVGRsTW1NME9EUmtOalEyTmpSbU56TTRNR1UwWWpVMk5UUTJNbVExSU9LQW9pQnVaWGRXTXlBOFlXNXBiV0YwWlNCaFpHUnBkR2wyWlQwaWMzVnRJaUJoZEhSeWFXSjFkR1ZPWVcxbFBTSnpkR0Z5ZEU5bVpuTmxkQ0lnWm5KdmJUMGlNQ1VpSUhSdlBTSXhNREFsSWlCaVpXZHBiajBpTUhNaUlHUjFjajBpTXpCeklpQnlaWEJsWVhSRGIzVnVkRDBpYVc1a1pXWnBibWwwWlNJZ0x6NDhMM1JsZUhSUVlYUm9QangwWlhoMFVHRjBhQ0J6ZEdGeWRFOW1abk5sZEQwaUxUVXdKU0lnWm1sc2JEMGlkMmhwZEdVaUlHWnZiblF0Wm1GdGFXeDVQU0luUTI5MWNtbGxjaUJPWlhjbkxDQnRiMjV2YzNCaFkyVWlJR1p2Ym5RdGMybDZaVDBpTVRCd2VDSWdlR3hwYm1zNmFISmxaajBpSTNSbGVIUXRjR0YwYUMxaElqNHdlREJpWVdSbFpqZ3pNakJsTjJVeVl6UTROR1EyTkRZMk5HWTNNemd3WlRSaU5UWTFORFl5WkRVZzRvQ2lJRzVsZDFZeklEeGhibWx0WVhSbElHRmtaR2wwYVhabFBTSnpkVzBpSUdGMGRISnBZblYwWlU1aGJXVTlJbk4wWVhKMFQyWm1jMlYwSWlCbWNtOXRQU0l3SlNJZ2RHODlJakV3TUNVaUlHSmxaMmx1UFNJd2N5SWdaSFZ5UFNJek1ITWlJSEpsY0dWaGRFTnZkVzUwUFNKcGJtUmxabWx1YVhSbElpQXZQand2ZEdWNGRGQmhkR2crUEM5MFpYaDBQanhuSUcxaGMyczlJblZ5YkNnalptRmtaUzF6ZVcxaWIyd3BJajQ4Y21WamRDQm1hV3hzUFNKdWIyNWxJaUI0UFNJd2NIZ2lJSGs5SWpCd2VDSWdkMmxrZEdnOUlqSTVNSEI0SWlCb1pXbG5hSFE5SWpJd01IQjRJaUF2UGlBOGRHVjRkQ0I1UFNJM01IQjRJaUI0UFNJek1uQjRJaUJtYVd4c1BTSjNhR2wwWlNJZ1ptOXVkQzFtWVcxcGJIazlJaWREYjNWeWFXVnlJRTVsZHljc0lHMXZibTl6Y0dGalpTSWdabTl1ZEMxM1pXbG5hSFE5SWpJd01DSWdabTl1ZEMxemFYcGxQU0l6Tm5CNElqNXVaWGRXTXk5TlFWUkpRend2ZEdWNGRENDhkR1Y0ZENCNVBTSXhNVFZ3ZUNJZ2VEMGlNekp3ZUNJZ1ptbHNiRDBpZDJocGRHVWlJR1p2Ym5RdFptRnRhV3g1UFNJblEyOTFjbWxsY2lCT1pYY25MQ0J0YjI1dmMzQmhZMlVpSUdadmJuUXRkMlZwWjJoMFBTSXlNREFpSUdadmJuUXRjMmw2WlQwaU16WndlQ0krTUM0ekpUd3ZkR1Y0ZEQ0OEwyYytQSEpsWTNRZ2VEMGlNVFlpSUhrOUlqRTJJaUIzYVdSMGFEMGlNalU0SWlCb1pXbG5hSFE5SWpRMk9DSWdjbmc5SWpJMklpQnllVDBpTWpZaUlHWnBiR3c5SW5KblltRW9NQ3d3TERBc01Da2lJSE4wY205clpUMGljbWRpWVNneU5UVXNNalUxTERJMU5Td3dMaklwSWlBdlBqeG5JRzFoYzJzOUluVnliQ2dqYm05dVpTa2lJSE4wZVd4bFBTSjBjbUZ1YzJadmNtMDZkSEpoYm5Oc1lYUmxLRGN5Y0hnc01UZzVjSGdwSWo0OGNtVmpkQ0I0UFNJdE1UWndlQ0lnZVQwaUxURTJjSGdpSUhkcFpIUm9QU0l4T0RCd2VDSWdhR1ZwWjJoMFBTSXhPREJ3ZUNJZ1ptbHNiRDBpYm05dVpTSWdMejQ4Y0dGMGFDQmtQU0pOTVNBeFF6a2dPREVnTmpVZ01UTTNJREUwTlNBeE5EVWlJSE4wY205clpUMGljbWRpWVNnd0xEQXNNQ3d3TGpNcElpQnpkSEp2YTJVdGQybGtkR2c5SWpNeWNIZ2lJR1pwYkd3OUltNXZibVVpSUhOMGNtOXJaUzFzYVc1bFkyRndQU0p5YjNWdVpDSWdMejQ4TDJjK1BHY2diV0Z6YXowaWRYSnNLQ051YjI1bEtTSWdjM1I1YkdVOUluUnlZVzV6Wm05eWJUcDBjbUZ1YzJ4aGRHVW9Oekp3ZUN3eE9EbHdlQ2tpUGp4eVpXTjBJSGc5SWkweE5uQjRJaUI1UFNJdE1UWndlQ0lnZDJsa2RHZzlJakU0TUhCNElpQm9aV2xuYUhROUlqRTRNSEI0SWlCbWFXeHNQU0p1YjI1bElpQXZQanh3WVhSb0lHUTlJazB4SURGRE9TQTRNU0EyTlNBeE16Y2dNVFExSURFME5TSWdjM1J5YjJ0bFBTSnlaMkpoS0RJMU5Td3lOVFVzTWpVMUxERXBJaUJtYVd4c1BTSnViMjVsSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJQzgrUEM5blBqeGphWEpqYkdVZ1kzZzlJamN6Y0hnaUlHTjVQU0l4T1RCd2VDSWdjajBpTkhCNElpQm1hV3hzUFNKM2FHbDBaU0lnTHo0OFkybHlZMnhsSUdONFBTSXlNVGR3ZUNJZ1kzazlJak16TkhCNElpQnlQU0kwY0hnaUlHWnBiR3c5SW5kb2FYUmxJaUF2UGlBOFp5QnpkSGxzWlQwaWRISmhibk5tYjNKdE9uUnlZVzV6YkdGMFpTZ3lPWEI0TENBek9EUndlQ2tpUGp4eVpXTjBJSGRwWkhSb1BTSTNOM0I0SWlCb1pXbG5hSFE5SWpJMmNIZ2lJSEo0UFNJNGNIZ2lJSEo1UFNJNGNIZ2lJR1pwYkd3OUluSm5ZbUVvTUN3d0xEQXNNQzQyS1NJZ0x6NDhkR1Y0ZENCNFBTSXhNbkI0SWlCNVBTSXhOM0I0SWlCbWIyNTBMV1poYldsc2VUMGlKME52ZFhKcFpYSWdUbVYzSnl3Z2JXOXViM053WVdObElpQm1iMjUwTFhOcGVtVTlJakV5Y0hnaUlHWnBiR3c5SW5kb2FYUmxJajQ4ZEhOd1lXNGdabWxzYkQwaWNtZGlZU2d5TlRVc01qVTFMREkxTlN3d0xqWXBJajVKUkRvZ1BDOTBjM0JoYmo0ME5qZzhMM1JsZUhRK1BDOW5QaUE4WnlCemRIbHNaVDBpZEhKaGJuTm1iM0p0T25SeVlXNXpiR0YwWlNneU9YQjRMQ0EwTVRSd2VDa2lQanh5WldOMElIZHBaSFJvUFNJeE5EQndlQ0lnYUdWcFoyaDBQU0l5Tm5CNElpQnllRDBpT0hCNElpQnllVDBpT0hCNElpQm1hV3hzUFNKeVoySmhLREFzTUN3d0xEQXVOaWtpSUM4K1BIUmxlSFFnZUQwaU1USndlQ0lnZVQwaU1UZHdlQ0lnWm05dWRDMW1ZVzFwYkhrOUlpZERiM1Z5YVdWeUlFNWxkeWNzSUcxdmJtOXpjR0ZqWlNJZ1ptOXVkQzF6YVhwbFBTSXhNbkI0SWlCbWFXeHNQU0ozYUdsMFpTSStQSFJ6Y0dGdUlHWnBiR3c5SW5KblltRW9NalUxTERJMU5Td3lOVFVzTUM0MktTSStUV2x1SUZScFkyczZJRHd2ZEhOd1lXNCtMVGsyTVRnd1BDOTBaWGgwUGp3dlp6NGdQR2NnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTWpsd2VDd2dORFEwY0hncElqNDhjbVZqZENCM2FXUjBhRDBpTVRRd2NIZ2lJR2hsYVdkb2REMGlNalp3ZUNJZ2NuZzlJamh3ZUNJZ2NuazlJamh3ZUNJZ1ptbHNiRDBpY21kaVlTZ3dMREFzTUN3d0xqWXBJaUF2UGp4MFpYaDBJSGc5SWpFeWNIZ2lJSGs5SWpFM2NIZ2lJR1p2Ym5RdFptRnRhV3g1UFNJblEyOTFjbWxsY2lCT1pYY25MQ0J0YjI1dmMzQmhZMlVpSUdadmJuUXRjMmw2WlQwaU1USndlQ0lnWm1sc2JEMGlkMmhwZEdVaVBqeDBjM0JoYmlCbWFXeHNQU0p5WjJKaEtESTFOU3d5TlRVc01qVTFMREF1TmlraVBrMWhlQ0JVYVdOck9pQThMM1J6Y0dGdVBpMDVNVEE0TUR3dmRHVjRkRDQ4TDJjK1BHY2djM1I1YkdVOUluUnlZVzV6Wm05eWJUcDBjbUZ1YzJ4aGRHVW9NakkyY0hnc0lEUXpNM0I0S1NJK1BISmxZM1FnZDJsa2RHZzlJak0yY0hnaUlHaGxhV2RvZEQwaU16WndlQ0lnY25nOUlqaHdlQ0lnY25rOUlqaHdlQ0lnWm1sc2JEMGlibTl1WlNJZ2MzUnliMnRsUFNKeVoySmhLREkxTlN3eU5UVXNNalUxTERBdU1pa2lJQzgrUEhCaGRHZ2djM1J5YjJ0bExXeHBibVZqWVhBOUluSnZkVzVrSWlCa1BTSk5PQ0E1UXpndU1EQXdNRFFnTWpJdU9UUTVOQ0F4Tmk0eU1EazVJREk0SURJM0lESTRJaUJtYVd4c1BTSnViMjVsSWlCemRISnZhMlU5SW5kb2FYUmxJaUF2UGp4amFYSmpiR1VnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1V6WkNnNGNIZ3NJREV3TGpWd2VDd2dNSEI0S1NJZ1kzZzlJakJ3ZUNJZ1kzazlJakJ3ZUNJZ2NqMGlOSEI0SWlCbWFXeHNQU0ozYUdsMFpTSXZQand2Wno0OEwzTjJaejQ9In0=";
    await SBT.connect(learner).mint(svg);

    // mint success
    expect(await SBT.balanceOf(learner.address)).to.equal(1);

    // unique check
    await expect(SBT.connect(learner).mint(svg)).to.revertedWith(
      "You have already minted."
    );

    // tokenURI check
    const tokenIds = await SBT.tokensOfOwner(learner.address);
    const URI = await SBT.tokenURI(tokenIds[0]);
    expect(svg).equal(URI);
  });
});
