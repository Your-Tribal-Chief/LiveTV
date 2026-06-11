import { Channel } from "../types";
import { parseM3u } from "../utils/m3uParser";

export const RAW_M3U_TEXT = `#EXTM3U
#EXTINF:-1 ,Boishakhi
https://boishakhi.sonarbanglatv.com/boishakhi/boishakhitv/index.m3u8
#EXTINF:-1 ,Omtv tamil
http://198.144.158.33:8888/TAMIL-TV_OMTV_LIVE_Transcoder/index.m3u8
#EXTINF:-1 ,Ananda TV
https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/anandatv.stream/tracks-v1a1/mono.m3u8
#EXTINF:-1 ,G-Series
https://vods2.aynaott.com/gseriesDrama/index.m3u8
#EXTINF:-1 ,Jalsha Movies
https://live20.bozztv.com/giatvplayout7/giatv-209627/tracks-v1a1/mono.ts.m3u8
#EXTINF:-1 ,Aakash Aath
https://live.thebosstv.com:30443/dwlive/AAKAASH-AATH/playlist.m3u8
#EXTINF:-1 ,Jamuna TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1701/output/index.m3u8
#EXTINF:-1 ,Somoy TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8
#EXTINF:-1 ,Channel 24
https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8
#EXTINF:-1 ,INDEPENDENT TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8
#EXTINF:-1 ,Ekattor TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1705/output/index.m3u8
#EXTINF:-1 ,ATN NEWS
https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/index.m3u8
#EXTINF:-1 ,News 24
https://owrcovcrpy.gpcdn.net/bpk-tv/1708/output/index.m3u8
#EXTINF:-1 ,BTV
https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8
#EXTINF:-1 ,Star News
https://owrcovcrpy.gpcdn.net/bpk-tv/1710/output/index.m3u8
#EXTINF:-1 ,Deepto TV HD
https://owrcovcrpy.gpcdn.net/bpk-tv/1711/output/index.m3u8
#EXTINF:-1 ,Sangsad TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1713/output/index.m3u8
#EXTINF:-1 ,Bangla Vision
https://owrcovcrpy.gpcdn.net/bpk-tv/1715/output/index.m3u8
#EXTINF:-1 ,NTV
https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8
#EXTINF:-1 ,SA TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1720/output/index.m3u8
#EXTINF:-1 ,Al-Jazeera
https://owrcovcrpy.gpcdn.net/bpk-tv/1721/output/index.m3u8
#EXTINF:-1 ,Maasranga TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8
#EXTINF:-1 ,Channel I
https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8
#EXTINF:-1 ,Islamic TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1724/output/index.m3u8
#EXTINF:-1 ,DBC News
https://owrcovcrpy.gpcdn.net/bpk-tv/1728/output/index.m3u8
#EXTINF:-1 ,Channel 9
https://owrcovcrpy.gpcdn.net/bpk-tv/1729/output/index.m3u8
#EXTINF:-1 ,EKUSHEY TV
https://ekusheyserver.com/etvlivesn.m3u8
#EXTINF:-1 ,Deshi TV HD
https://deshitv.deshitv24.net/live/myStream/playlist.m3u8
#EXTINF:-1 ,ATN Bangla UK
https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI2/atnbanglauk-off.stream/playlist.m3u8
#EXTINF:-1 ,NTV UK
https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI2/ntvuk00332211.stream/playlist.m3u8
#EXTINF:-1 ,Sangeet Bangla
https://cdn-4.pishow.tv/live/1143/master.m3u8
#EXTINF:-1 ,Kolkata TV
https://cdn.ottlive.co.in/kolkatatv/index.m3u8
#EXTINF:-1 ,TV9 Bangla
https://amg01448-samsungin-tv9bangla-samsungin-9lgnh.amagi.tv/playlist/amg01448-samsungin-tv9bangla-samsungin/playlist.m3u8
#EXTINF:-1 ,R Bangla
https://tvsen5.aynaott.com/R_Bangla/tracks-v1a1/mono.ts.m3u8
#EXTINF:-1 ,NK
https://amg01218-republictvfast-amg01218c1-samsung-in-1918.playouts.now.amagi.tv/playlist/amg01218-republictvfast-rbangla-samsungin/playlist.m3u8
#EXTINF:-1 ,Movie Bangla
http://alvetv.com/moviebanglatv/8080/index.m3u8
#EXTINF:-1 ,Enter10 Bangla
https://amg01448-samsungin-enterr10bangla-samsungin-ad-gg.amagi.tv/playlist/amg01448-samsungin-enterr10bangla-samsungin/playlist.m3u8
#EXTINF:-1 ,Srk Tv
https://srknowapp.ncare.live/srktvhlswodrm/srktv.stream/playlist.m3u8
#EXTINF:-1 ,Bengali Beats
https://tplay.live/originals/bengali-beats/index.m3u8
#EXTINF:-1 ,Gopal Bhar
https://live20.bozztv.com/giatvplayout7/giatv-209611/tracks-v1a1/mono.ts.m3u8
#EXTINF:-1 ,Motu Patlu
https://live20.bozztv.com/giatvplayout7/giatv-209622/tracks-v1a1/mono.ts.m3u8
#EXTINF:-1 ,Doraemon
https://live20.bozztv.com/giatvplayout7/giatv-209902/tracks-v1a1/mono.ts.m3u8
#EXTINF:-1 ,HappyKids (1080p)
https://dil9xdvretp0f.cloudfront.net/index.m3u8
#EXTINF:-1 ,PBS Kids
https://livestream.pbskids.org/out/v1/14507d931bbe48a69287e4850e53443c/est.m3u8
#EXTINF:-1 ,Originals
https://nomawnoijl.gpcdn.net/akash/originals/playlist.m3u8
#EXTINF:-1 ,Cineedge HD
https://nomawnoijl.gpcdn.net/akash/cineedge/playlist.m3u8
#EXTINF:-1 ,Uniques HD
https://nomawnoijl.gpcdn.net/akash/uniques/playlist.m3u8
#EXTINF:-1 ,Superrix HD
https://nomawnoijl.gpcdn.net/akash/superrix/playlist.m3u8
#EXTINF:-1 ,Crazy Ex
https://nomawnoijl.gpcdn.net/akash/crazy_ex/playlist.m3u8
#EXTINF:-1 ,Screem
https://nomawnoijl.gpcdn.net/akash/screem/playlist.m3u8
#EXTINF:-1 ,Sports Legends
https://nomawnoijl.gpcdn.net/akash/sportslegends/playlist.m3u8
#EXTINF:-1 ,Flash Guys HD
https://nomawnoijl.gpcdn.net/akash/flashguys/playlist.m3u8
#EXTINF:-1 ,Party Universe
https://nomawnoijl.gpcdn.net/akash/partyuniverse/playlist.m3u8
#EXTINF:-1 ,Delicious
https://nomawnoijl.gpcdn.net/akash/delicious/playlist.m3u8
#EXTINF:-1 ,Luxel HD
https://nomawnoijl.gpcdn.net/akash/luxell/playlist.m3u8
#EXTINF:-1 ,Nikki
https://nomawnoijl.gpcdn.net/akash/nikky/playlist.m3u8
#EXTINF:-1 ,Joy
https://nomawnoijl.gpcdn.net/akash/joy/playlist.m3u8
#EXTINF:-1 ,BuddyStar HD
https://nomawnoijl.gpcdn.net/akash/buddystar/playlist.m3u8
#EXTINF:-1 ,Funny Junior HD
https://nomawnoijl.gpcdn.net/akash/funnyjunior/playlist.m3u8
#EXTINF:-1 ,Crimes
https://nomawnoijl.gpcdn.net/akash/crimes/playlist.m3u8
#EXTINF:-1 ,True Stories
https://nomawnoijl.gpcdn.net/akash/truestories/playlist.m3u8
#EXTINF:-1 ,Intelligence
https://nomawnoijl.gpcdn.net/akash/intelligence/playlist.m3u8
#EXTINF:-1 ,Enter 10 Bangla
https://live-bangla.akamaized.net/liveabr/pub-iobanglakp3sff/live_720p/chunks.m3u8
#EXTINF:-1 ,Bangla +
https://live-stream.utkalbongo.com/hls/livebanglatvstream.m3u8
#EXTINF:-1 ,Dhoom Music
http://103.175.73.12:8080/live/378/378_0.m3u8
#EXTINF:-1 ,ABP Ananda
https://amg01448-samsungin-abpananda-samsungin-ad-pw.amagi.tv/playlist/amg01448-samsungin-abpananda-samsungin/playlist.m3u8
#EXTINF:-1 ,Zee 24 Ghanta
https://d2dsoyvkr33m05.cloudfront.net/index_1.m3u8
#EXTINF:-1 ,News18 Bangla News
https://amg01448-samsungin-news18bangla-samsungin-ad-qy.amagi.tv/playlist/amg01448-samsungin-news18bangla-samsungin/playlist.m3u8
#EXTINF:-1 ,R Plus News
https://thelegitpro.in/pntv/rplusnews24x7/tracks-v1a1/mono.m3u8
#EXTINF:-1 ,Calcutta News
https://akdnetwork.co.in/live/cnnew/index.m3u8
#EXTINF:-1 ,Zee Anmol TV
http://103.175.73.12:8080/live/256/256_0.m3u8
#EXTINF:-1 ,B4U Kadak
https://cdn-2.pishow.tv/live/227/master.m3u8
#EXTINF:-1 ,Sheemaroo Bollywood
https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg00864-shemarooenterta-shemabollywood-ono/playlist.m3u8
#EXTINF:-1 ,Joo Music
https://livecdn.live247stream.com/joomusic/tv/playlist.m3u8
#EXTINF:-1 ,Goldmines
https://cdn-2.pishow.tv/live/1459/master.m3u8
#EXTINF:-1 ,Goldmines Bollywood
http://103.175.73.12:8080/live/52/52_0.m3u8
#EXTINF:-1 ,Goldmines Movies
https://cdn-2.pishow.tv/live/1461/master.m3u8
#EXTINF:-1 ,Goldmines Movies 2
https://cdn-2.pishow.tv/live/1460/master.m3u8
#EXTINF:-1 ,Manoranjan Prime
http://103.175.73.12:8080/live/345/345_0.m3u8
#EXTINF:-1 ,Manoranjan Grend
http://103.175.73.12:8080/live/19/19_0.m3u8
#EXTINF:-1 ,DD Sports 2.0
https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/b17adfe543354fdd8d189b110617cddd/index.m3u8
#EXTINF:-1 ,Discovery Bangla
http://202.70.146.135:8000/play/a05z/index.m3u8
#EXTINF:-1 ,BBC Earth
https://d3u3pfhhvuad9k.cloudfront.net/playlist/amg00793-bbcstudios-bbcearta-lgus/playlist.m3u8
#EXTINF:-1 ,BBC Earth
https://amg00793-bbcstudios-amg00793c3-lg-us-2528.playouts.now.amagi.tv/playlist/amg00793-bbcstudios-bbcearta-lgus/playlist.m3u8
#EXTINF:-1 ,Travel XP English EU
https://travelxp-travelxp-1-eu.rakuten.wurl.tv/playlist.m3u8
#EXTINF:-1 ,Travel XP English NZ
https://travelxp-travelxp-1-nz.samsung.wurl.tv/playlist.m3u8
#EXTINF:-1 ,Wild Earth
https://wildearth-plex.amagi.tv/master.m3u8
#EXTINF:-1 ,Food Food
http://103.175.73.12:8080/live/143/143_0.m3u8
#EXTINF:-1 ,CGTN Docment
https://english-livebkali.cgtn.com/live/doccgtn_1.m3u8
#EXTINF:-1 ,Discover Pakistan TV
https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI2/discoverpakistan.stream/playlist.m3u8
#EXTINF:-1 ,Tom & Jarry
https://live20.bozztv.com/giatvplayout7/giatv-208314/playlist.m3u8
#EXTINF:-1 ,Zoo Moo
https://amg01553-blueantmediaasi-zoomoonz-samsungnz-rdufn.amagi.tv/playlist/amg01553-blueantmediaasi-zoomoonz-samsungnz/playlist.m3u8
#EXTINF:-1 ,Rongeen TV
https://server.thelegitpro.in/rongeentv/rongeentv/tracks-v1a1/mono.m3u8
#EXTINF:-1 ,Jungle Book
https://cc-4bhi5osabejc9.akamaized.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-4bhi5osabejc9/junglebook.m3u8
#EXTINF:-1,Cartoon Network HD
https://server.itcnbd.live/stream/cartoon_network_hd.m3u8
#EXTINF:-1,Cartoon Network SD
https://server.itcnbd.live/stream/cartoon_network_sd.m3u8
#EXTINF:-1,Pogo SD
https://server.itcnbd.live/stream/pogo_sd.m3u8
#EXTINF:-1,Discovery Kids
https://server.itcnbd.live/stream/discovery_kids.m3u8
#EXTINF:-1,SONY YAY VIP
https://server.itcnbd.live/stream/sonyyay.m3u8
#EXTINF:-1,BAL BHARAT
https://s2.itcnbd.live/bal-bharat/index.m3u8
#EXTINF:-1,CARTOON NETWORK
https://s2.itcnbd.live/cartoon-network/index.m3u8
#EXTINF:-1,DURANTA TV
https://s2.itcnbd.live/duranta-tv/index.m3u8
#EXTINF:-1,HUNGAMA
https://s2.itcnbd.live/hungama/index.m3u8
#EXTINF:-1,NICK
https://s2.itcnbd.live/nick/index.m3u8
#EXTINF:-1,NICK JR
https://s2.itcnbd.live/nick-jr/index.m3u8
#EXTINF:-1,POGO
https://s2.itcnbd.live/pogo/index.m3u8
#EXTINF:-1,SONIC
https://s2.itcnbd.live/sonic/index.m3u8
#EXTINF:-1,SONY YAY
https://s2.itcnbd.live/sony-yay/index.m3u8
#EXTINF:-1,SUPER HUNGAMA
https://s2.itcnbd.live/super-hungama/index.m3u8
`;

export const DEFAULT_CHANNELS: Channel[] = parseM3u(RAW_M3U_TEXT);
