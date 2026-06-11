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

export const FIFA_1_M3U = `#EXTM3U
#EXTINF:-1,FIFA World Cup 2026🅱️
https://tvsen7.aynaott.com/tsports-hd/tracks-v1a1/mono.ts.m3u8
#EXTINF:-1,FIFA World Cup 2026
https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8
#EXTINF:-1,FIFA World Cup 2026
https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/1702-audio_113322_eng=113200-video=2202800.m3u8
#EXTINF:-1,FIFA World Cup 2026 🇦🇷[coming]
http://cdn.tv-rds.workers.dev/TYCSPT.m3u8
#EXTINF:-1,FIFA World Cup 2026 🇧🇷[coming]
https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/1080p-vtt/index.m3u8
#EXTINF:-1,FIFA World Cup 2026 🇮🇳[coming]
http://66.102.126.10:8000/play/a076/index.m3u8
#EXTINF:-1,FIFA World Cup 2026 🇮🇳[coming]
http://66.102.126.10:8000/play/a022/index.m3u8`;

export const FIFA_2_M3U = `#EXTM3U
#EXTINF:-1 tvg-id="BTVNational.bd@SD" tvg-logo="https://i.imgur.com/5OE2FDt.png" group-title="",BTV National (720p)
https://tvsen6.aynaott.com/btvhd/index.m3u8
#EXTINF:-1 tvg-id="BTVNational.bd@SD" tvg-logo="https://i.imgur.com/5OE2FDt.png" group-title="",BTV National (1080p)
https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/1709.m3u8
#EXTINF:-1 tvg-id="BTVNational.bd@SD" tvg-logo="https://i.imgur.com/5OE2FDt.png" group-title="",BTV National (1080p)
https://www.btvlive.gov.bd/streams/ef8b8bbc-98b7-4ba7-a49d-a0adaf259d35/ES/355ba051-9a60-48aa-adcf-5a6c64da8c5c/355ba051-9a60-48aa-adcf-5a6c64da8c5c_3_playlist.m3u8`;

export const FIFA_3_M3U = `#EXTM3U
#EXTINF:-1,FIFA World Cup 2026
https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/1702-audio_113322_eng=113200-video=2202800.m3u8
#EXTINF:-1,FIFA World Cup 2026 🇧🇷[coming]
https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/1080p-vtt/index.m3u8
#EXTINF:-1,Star Sports 2 Hindi HD (1080p)
http://103.157.248.140:8000/play/a01m/index.m3u8
#EXTINF:-1,SONY LIV
http://live.balajibroadband.com:3500/live/892.m3u8
#EXTINF:-1,Star Sports 1 Hindi
http://103.157.248.140:8000/play/a00g/index.m3u8
#EXTINF:-1,Hub Sports 3 HD
http://tv-premium-pro.com/live/wezqqszfr2/i7481xvrdf/280824.m3u8
#EXTINF:-1,Sky Sport1 NZ FHD
http://tv-premium-pro.com/live/wezqqszfr2/i7481xvrdf/579826.m3u8
#EXTINF:-1,Sky Sport2 NZ FHD
http://tv-premium-pro.com/live/wezqqszfr2/i7481xvrdf/579825.m3u8
#EXTINF:-1,Sky Sport3 NZ FHD
http://tv-premium-pro.com/live/wezqqszfr2/i7481xvrdf/579824.m3u8
#EXTINF:-1,Sky Sport4 NZ FHD
http://tv-premium-pro.com/live/wezqqszfr2/i7481xvrdf/579823.m3u8
#EXTINF:-1,Sky Sport5 NZ FHD
http://tv-premium-pro.com/live/wezqqszfr2/i7481xvrdf/579822.m3u8
#EXTINF:-1,Sky Sport6 NZ FHD
http://tv-premium-pro.com/live/wezqqszfr2/i7481xvrdf/579821.m3u8
#EXTINF:-1,Sky Sport7 NZ FHD
http://tv-premium-pro.com/live/wezqqszfr2/i7481xvrdf/579820.m3u8
#EXTINF:-1,beIN SPORTS 4 HD
http://ytoxw6un.ottclub.xyz/iptv/VSQZTL9D68WBD9/6125/index.m3u8
#EXTINF:-1,beIN SPORTS 5 HD
http://ytoxw6un.ottclub.xyz/iptv/VSQZTL9D68WBD9/6126/index.m3u8
#EXTINF:-1,beIN SPORTS 6 HD
http://ytoxw6un.ottclub.xyz/iptv/VSQZTL9D68WBD9/6127/index.m3u8
#EXTINF:-1,beIN SPORTS 7 HD
http://ytoxw6un.ottclub.xyz/iptv/VSQZTL9D68WBD9/6128/index.m3u8
#EXTINF:-1,BEIN SPORTS 1 FRANCE
http://ytoxw6un.ottclub.xyz/iptv/VSQZTL9D68WBD9/2499/index.m3u8
#EXTINF:-1,BEIN SPORTS 2 FRANCE
http://ytoxw6un.ottclub.xyz/iptv/VSQZTL9D68WBD9/2500/index.m3u8
#EXTINF:-1,BEIN SPORTS 3 FRANCE
http://ytoxw6un.ottclub.xyz/iptv/VSQZTL9D68WBD9/2501/index.m3u8
#EXTINF:-1,SPORT KLUB 1
http://tv-premium-pro.com/live/wezqqszfr2/i7481xvrdf/227232.m3u8
#EXTINF:-1,SPORT KLUB 3
http://tv-premium-pro.com/live/wezqqszfr2/i7481xvrdf/227234.m3u8
#EXTINF:-1,SPORT KLUB 4
http://tv-premium-pro.com/live/wezqqszfr2/i7481xvrdf/227235.m3u8
#EXTINF:-1,Dazn Eleven 1
http://znty.dyndns.org:5010/hls/eleven1.m3u8
#EXTINF:-1,Dazn Eleven 2
http://znty.dyndns.org:5010/hls/eleven2.m3u8
#EXTINF:-1,Dazn Eleven 3
http://znty.dyndns.org:5010/hls/eleven3.m3u8
#EXTINF:-1,Dazn Eleven 4
http://znty.dyndns.org:5010/hls/eleven4.m3u8
#EXTINF:-1,Dazn Eleven 5
http://znty.dyndns.org:5010/hls/eleven5.m3u8
#EXTINF:-1,İspanya La Liga 2
https://andro.226503.xyz/checklist/androstreamlivess1.m3u8
#EXTINF:-1,İskoçya Premier Lig
https://andro.226503.xyz/checklist/androstreamliveexn2.m3u8
#EXTINF:-1,İngiltere Premier Lig
https://andro.226503.xyz/checklist/androstreamlivebs3.m3u8
#EXTINF:-1,TUDN HD
https://futbol9865.ultratv13.workers.dev/deportivo111/68.m3u8
#EXTINF:-1,TUDN HD OP2
https://futbol9865.ultratv13.workers.dev/deportivo111/106.m3u8
#EXTINF:-1,TUDN HD OP3
https://futbol9865.ultratv13.workers.dev/deportivo111/107.m3u8
#EXTINF:-1,Setenta Sport 1 🇷🇺
http://cdntv.online/low/9mlxywika2/1021.m3u8
#EXTINF:-1,МАТЧ! ФУТБOЛ 1HD 🇷🇺
http://cdntv.online/low/9mlxywika2/55.m3u8
#EXTINF:-1,МАТЧ! ФУТБOЛ 3HD 🇷🇺
http://cdntv.online/low/9mlxywika2/57.m3u8
#EXTINF:-1,ZIGGO SPORT 2 HD 🇳🇱
http://wo0dyefk.dienalt.org/iptv/DV3AC2Q6YSR9XE/2561/index.m3u8
#EXTINF:-1,ZIGGO SPORT 3 HD 🇳🇱
http://wo0dyefk.dienalt.org/iptv/DV3AC2Q6YSR9XE/2559/index.m3u8
#EXTINF:-1,ZIGGO SPORT LIVE 🇳🇱
http://wo0dyefk.dienalt.org/iptv/DV3AC2Q6YSR9XE/2560/index.m3u8
#EXTINF:-1,5 SPORT 🇮🇱
http://wo0dyefk.dienalt.org/iptv/DV3AC2Q6YSR9XE/2558/index.m3u8
#EXTINF:-1,CAZE TV 1 🇧🇷
https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/Caze_TV.m3u8
#EXTINF:-1,X SPORT 🇷🇺
http://iptv.prosto.tv:7000/ch109/video.m3u8
#EXTINF:-1,ON Sports+ 🇭🇰
https://freem3u.xyz/api/live/play.m3u8
#EXTINF:-1,MASR 🇶🇦
https://shls-masr-ak.akamaized.net/out/v1/d5036cabf11e45bf9d0db410ca135c18/index.m3u8
#EXTINF:-1,TELETRAK 🇨🇱
http://unlimited6-cl.dps.live/sportinghd/sportinghd.smil/playlist.m3u8
#EXTINF:-1,Sport5 🇮🇱
https://rgelive.akamaized.net/hls/live/2043095/live3/playlist.m3u8
#EXTINF:-1,Ekushey TV
http://210.4.72.204/hls-live/livepkgr/_definst_/liveevent/livestream3.m3u8
#EXTINF:-1,Deepto TV
https://byphdgllyk.gpcdn.net/hls/deeptotv/0_1/index.m3u8
#EXTINF:-1,NTV
https://tvsen5.aynaott.com/ntvbd/index.m3u8
#EXTINF:-1,Bangla Vision
https://tvsen5.aynaott.com/banglavision/index.m3u8
#EXTINF:-1,Maasranga TV
https://tvsen5.aynaott.com/maasrangatv/index.m3u8
#EXTINF:-1,ATN News
https://tvsen6.aynaott.com/atnnews/index.m3u8
#EXTINF:-1,Independent TV
https://tvsen6.aynaott.com/independenttv/index.m3u8
#EXTINF:-1,Jamuna TV
https://tvsen6.aynaott.com/jamunatv/index.m3u8
#EXTINF:-1,Star News
https://owrcovcrpy.gpcdn.net/bpk-tv/1710/output/1701.m3u8
#EXTINF:-1,Rongeen TV
https://server.thelegitpro.in/rongeentv/rongeentv/index.m3u8
#EXTINF:-1,Deshi TV (720p)
https://deshitv.deshitv24.net/live/myStream/playlist.m3u8
#EXTINF:-1,T Sports (720p)
https://tvsen7.aynaott.com/tsportsfhd/index.m3u8
#EXTINF:-1,Ekushey TV (480p)
https://ekusheyserver.com/etvlivesn.m3u8
#EXTINF:-1,NTV (720p)
https://tvsen5.aynaott.com/xV4jEKf3D9zc/index.m3u8
#EXTINF:-1,Saudia Arabia
https://shd-gcp-live.edgenextcdn.net/live/bitmovin-saudi-tv/2ad66056b51fd8c1b624854623112e43/index.m3u8
#EXTINF:-1,A Sports HD
https://tvsen6.aynaott.com/asports/tracks-v1a1/mono.ts.m3u8
#EXTINF:-1,Willow Extra Live
http://27.124.71.27/Willow_Extra/index.m3u8
#EXTINF:-1,Arabica TV
http://istream.binarywaves.com:8081/hls/arabica/playlist.m3u8
#EXTINF:-1,Saudi Quran
https://cdn-globecast.akamaized.net/live/eds/saudi_quran/hls_roku/index.m3u8
#EXTINF:-1,
https://cdn-globecast.akamaized.net/live/eds/saudi_sunnah/hls_roku/index.m3u8
#EXTINF:-1,Sunnah Tv
http://m.live.net.sa:1935/live/sunnah/chunklist.m3u8
#EXTINF:-1,QURAN
http://m.live.net.sa:1935/live/quran/playlist.m3u8
#EXTINF:-1,AL SUNNAH TV
http://m.live.net.sa:1935/live/sunnah/playlist.m3u8
#EXTINF:-1,AL EKHBARIA
https://cdn-globecast.akamaized.net/live/eds/al_ekhbariya/hls_roku/index.m3u8
#EXTINF:-1,ALMASIRA MUBASHER
https://live2.cdnbridge.tv/AlmasirahMubasher/Mubasher_All/playlist.m3u8
#EXTINF:-1,AL EKHBARIA
https://shd-gcp-live.edgenextcdn.net/live/bitmovin-al-ekhbaria/297b3ef1cd0633ad9cfba7473a686a06/index.m3u8
#EXTINF:-1,AL QAMAR
https://streamer3.premio.link/alqamar/playlist.m3u8
#EXTINF:-1,Insight
https://insighttv-samsung-us.amagi.tv/playlist.m3u8
#EXTINF:-1,REAL WILD
https://cdn-ue1-prod.tsv2.amagi.tv/linear/amg00426-littledotstudio-realwild-tcl/playlist.m3u8
#EXTINF:-1,DW NEWS
https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/stream02/streamPlaylist.m3u8
#EXTINF:-1,FASHION ONE
https://b01c02nl.mediatriple.net/videoonlylive/mtkgeuihrlfwlive/u_stream_5c9e2ee6997cb_1/playlist.m3u8
#EXTINF:-1,Digital Fashion
http://115.187.41.216:8080/hls/digitalfashion/index.m3u8
#EXTINF:-1,Quran
https://download.quranicaudio.com/qdc/abdurrahmaan_as_sudais/murattal/96.mp3
#EXTINF:-1,DW English
https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8
#EXTINF:-1,News Max 2
https://nmxlive.akamaized.net/hls/live/529965/Live_1/index.m3u8
#EXTINF:-1,NDTV NEWS
https://ndtv24x7elemarchana.akamaized.net/hls/live/2003678-b/ndtv24x7/master.m3u8
#EXTINF:-1,Al Quran Radio
http://66.45.232.131:9994/;stream.mp3
#EXTINF:-1,NDTV Hindi
https://ndtvindiaelemarchana.akamaized.net/hls/live/2003679/ndtvindia/master.m3u8
#EXTINF:-1,NDTV English
https://ndtv24x7elemarchana.akamaized.net/hls/live/2003678/ndtv24x7/master.m3u8
#EXTINF:-1,Arihant TV
https://aasthaott.akamaized.net/110923/smil:arihant.smil/chunklist_b1928000.m3u8
#EXTINF:-1,Sheemaroo Bollywood
https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg00864-shemarooenterta-shemabollywood-ono/playlist.m3u8
#EXTINF:-1,Zee Action
http://103.175.73.12:8080/live/270/270_0.m3u8
#EXTINF:-1,RTNEWS GLOBAL
https://rt-rtd.rttv.com/dvr/rtdoc/playlist.m3u8
#EXTINF:-1,R Plus News
https://thelegitpro.in/pntv/rplusnews24x7/tracks-v1a1/mono.m3u8
#EXTINF:-1,Big Magic
http://103.175.73.12:8080/live/13/13_0.m3u8
#EXTINF:-1,RT News (EN)
https://rt-glb.rttv.com/live/rtnews/playlist.m3u8
#EXTINF:-1,Goldmines Bollywood
http://103.175.73.12:8080/live/52/52_0.m3u8
#EXTINF:-1,Action Hollywood Movies
https://amg01076-lightningintern-actionhollywood-samsungnz-82rry.amagi.tv/playlist/amg01076-lightningintern-actionhollywood-samsungnz/playlist.m3u8
#EXTINF:-1,Hindi Hits HD
http://146.59.253.52:8080/hindihitshd/index.m3u8
#EXTINF:-1,Food Food
http://103.175.73.12:8080/live/143/143_0.m3u8
#EXTINF:-1,9XM
http://103.175.73.12:8080/live/155/155_0.m3u8
#EXTINF:-1,YRF Music HD
https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg01412-xiaomiasia-yrfmusic-xiaomi/playlist.m3u8
#EXTINF:-1,Surongo
https://pub-d8f5af7f053343ed8295b16a145f6c1c.r2.dev/siam/[FGBDVibes]Surongo.(2023).480p.mkv
#EXTINF:-1,E24
http://103.175.73.12:8080/live/159/159_0.m3u8
#EXTINF:-1,Antarjal
http://103.225.94.27/Infobase/hdd-2/Bangla/Antarjal%20(2023)%201080p%20WEBDL.mp4
#EXTINF:-1,NHK World
http://103.175.73.12:8080/live/417/417_0.m3u8
#EXTINF:-1,Mardaani 3
http://103.225.94.27/Infobase/hdd-3/hindi/Mardaani%203%20(2026)%201080p%20DVDRip.mp4
#EXTINF:-1,Test
http://103.225.94.27/Infobase/hdd-3/Hindi%20Dub/Test%20(2025)%201080p%20WEBDL.mp4
#EXTINF:-1,NAGORIK TV HD
http://103.204.43.87:8080/live/1/1/282.m3u8
#EXTINF:-1,Jalsha Movies HD
http://103.204.43.87:8080/live/1/1/245.m3u8
#EXTINF:-1,Baallee
https://mcncdndigital.com/balleballetv/tracks-v1a1/mono.ts.m3u8
#EXTINF:-1,MBC tv
http://93.184.10.248/MBCBollywood/index.m3u8
#EXTINF:-1,Star Gold-2 HD
http://103.204.43.87:8080/live/1/1/246.m3u8
#EXTINF:-1,&Flix HD
http://212.102.34.8:9080/AndFlixHD/video.m3u8
#EXTINF:-1,Sony Pix
http://103.204.43.87:8080/live/1/1/260.m3u8
#EXTINF:-1,Live Sports-8 (FIFA World Cup)
http://103.204.43.87:8080/live/1/1/264.m3u8
#EXTINF:-1,Live Sports-9 (FIFA World Cup)
http://103.204.43.87:8080/live/1/1/254.m3u8
#EXTINF:-1,Star Sports Select 2
http://103.204.43.87:8080/live/1/1/243.m3u8
#EXTINF:-1,PTV Sports
http://119.156.228.231:9983/stream/channelid/679185749
#EXTINF:-1,Euro Sports
https://stream.ottplus.bd/live/euro_sports_hd_abr/live/euro_sports_hd/chunks.m3u8
#EXTINF:-1,A
http://luckonline.eu/live/y49sz6KMQs/6115263489/1142.ts
#EXTINF:-1,B
https://tvsen6.aynaott.com/ColorsBangla/index.m3u8
#EXTINF:-1,C
http://live.balajibroadband.com:3500/live/756.m3u8
#EXTINF:-1,Star Sports 1 Hindi
http://41.205.93.154/STARSPORTS1/index.m3u8
#EXTINF:-1,Star Sports 2 hd
https://tvsen7.aynaott.com/ssport2hd/index.m3u8
#EXTINF:-1,Star Sports 3
http://103.157.248.140:8000/play/a00i/index.m3u8
#EXTINF:-1,Star Sports Select 1 HD
http://103.157.248.140:8000/play/a00o/index.m3u8
#EXTINF:-1,Star Movies Select HD
http://103.204.43.87:8080/live/1/1/253.m3u8
#EXTINF:-1,Star Movies HD
http://103.204.43.87:8080/live/1/1/267.m3u8
#EXTINF:-1,COLORS CINEPLEX HD
http://103.204.43.87:8080/live/1/1/237.m3u8
#EXTINF:-1,&pictures HD
http://103.204.43.87:8080/live/1/1/232.m3u8
#EXTINF:-1,MOV | Star Gold HD
http://198.195.239.50:8095/StarGold/index.m3u8
#EXTINF:-1,Euro Sport 1 HD
http://169.150.223.25/Eurosport1HD/index.m3u8
#EXTINF:-1,Euro Sport 2 HD
http://169.150.223.25/Eurosport2HD/index.m3u8
#EXTINF:-1,Toffee {premium}
http://main.epgmaker.com/live/y49sz6KMQs/6115263489/522.ts
#EXTINF:-1,T SPORTS
https://amitomar.bdixbd.net/hoichoi.pro1/tracks-v1/index.m3u8
#EXTINF:-1,TNT SPORTS 3
https://bein-esp-xumo.amagi.tv/playlistR720P.m3u8
#EXTINF:-1,Astro  football
http://103.157.248.140:8000/play/a05x/index.m3u8
#EXTINF:-1,Astro  football
http://103.157.248.140:8000/play/a01q/index.m3u8
#EXTINF:-1,SONY SPORTS 3 HD
http://maxotts.maxdigitaltv.com/x-media/C73/master.m3u8
#EXTINF:-1,FIFA World Cup 2026
https://tvsen7.aynaott.com/tsports-hd/tracks-v1a1/mono.ts.m3u8
#EXTINF:-1,FIFA World Cup 2026
https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8
#EXTINF:-1,FIFA World Cup 2026 🇮🇳
http://66.102.126.10:8000/play/a076/index.m3u8
#EXTINF:-1,A SPORTS HD
https://tvsen6.aynaott.com/asports/index.m3u8
#EXTINF:-1,PTV SPORTS HD
https://tvsen5.aynaott.com/PtvSports/index.m3u8
#EXTINF:-1,STAR SPORTS 1
https://tvsen7.aynaott.com/sspts1/tracks-v1a1/mono.ts.m3u8
#EXTINF:-1,WILLOW LIVE
https://tvsen5.aynaott.com/willowhd/index.m3u8
#EXTINF:-1,Golf Channel
https://tvsen6.aynaott.com/golfchannel/index.m3u8
#EXTINF:-1,ESPN
https://tvsen5.aynaott.com/espn/index.m3u8
#EXTINF:-1,TSN 1
https://tvsen7.aynaott.com/tsn1/index.m3u8
#EXTINF:-1,TSN 2
https://tvsen7.aynaott.com/tsn2/index.m3u8
#EXTINF:-1,TSN 3
https://tvsen7.aynaott.com/tsn3/index.m3u8
#EXTINF:-1,Sports Grid
https://tvsen6.aynaott.com/SportsGrid/index.m3u8
#EXTINF:-1,Bloomberg TV
https://tvsen6.aynaott.com/bloombergtv/index.m3u8
#EXTINF:-1,NFL Network
https://tvsen6.aynaott.com/nfl/index.m3u8
#EXTINF:-1,REAL MADRID
https://rmtv.akamaized.net/hls/live/2043153/rmtv-es-web/bitrate_3.m3u8
#EXTINF:-1,WWE Smackdown
https://601.formaturamaxi.com.br/wwe.m3u8
#EXTINF:-1,beIN sports Xtra HD
https://bein-esp-xumo.amagi.tv/playlistR1080p.m3u8
#EXTINF:-1,Football World Cup 2026
https://tvsen5.aynaott.com/PtvSports/tracks-v1a1/mono.ts.m3u8
#EXTINF:-1,DAZN COMBAT
https://dazn-combat-rakuten.amagi.tv/hls/amagi_hls_data_rakutenAA-dazn-combat-rakuten/CDN/master.m3u8
#EXTINF:-1,Star Sports 1 HD
https://tvsen7.aynaott.com/sspts1/index.m3u8
#EXTINF:-1,STAR SPORTS KHEL
http://103.175.73.12:8080/live/151/151_0.m3u8
#EXTINF:-1,Trace Sport
https://lightning-tracesport-samsungau.amagi.tv/playlist.m3u8
#EXTINF:-1,SKY SPORTS ACTION
http://sewv654wfcsdwfi87fwvgbngh.siauliairsavlt.pw/iptv/VCQ4ADX96VH4G8PY7URBWRQU/9155/index.m3u8
#EXTINF:-1,SKY SPORTS ACTION
http://6zirt9yx.otttv.pw/iptv/HEGN4VXXQQSYCA/9155/index.m3u
#EXTINF:-1,Willow Cricket
http://4kgood.org:80/live/4o48up5evz/r4fiast66u/13141.ts
#EXTINF:-1,Hub Sports 2 HD
http://tv-premium-pro.com/live/wezqqszfr2/i7481xvrdf/280823.m3u8
#EXTINF:-1,BEIN SPORTS 1 FRANCE
http://sewv654wfcsdwfi87fwvgbngh.siauliairsavlt.pw/iptv/VCQ4ADX96VH4G8PY7URBWRQU/2499/index.m3u8
#EXTINF:-1,BEIN SPORTS 2 FRANCE
http://sewv654wfcsdwfi87fwvgbngh.siauliairsavlt.pw/iptv/VCQ4ADX96VH4G8PY7URBWRQU/2500/index.m3u8
#EXTINF:-1,BEIN SPORTS 3 FRANCE
http://sewv654wfcsdwfi87fwvgbngh.siauliairsavlt.pw/iptv/VCQ4ADX96VH4G8PY7URBWRQU/2501/index.m3u8
#EXTINF:-1,Sport 1
http://212.102.38.45/live/test_sport1_25p/playlist.m3u8
#EXTINF:-1,Sport 2
http://212.102.38.45/live/test_sport_2/playlist.m3u8
#EXTINF:-1,DD SPORTS
https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/b17adfe543354fdd8d189b110617cddd/index.m3u8
#EXTINF:-1,Football World Cup 2026 (T SPORTS)
http://103.204.43.87:8080/live/1/1/284.m3u8
#EXTINF:-1,İngiltere Premier Lig
https://andro.226503.xyz/checklist/androstreamliveidm.m3u8
#EXTINF:-1,2TV Sport 🇳🇴
https://tv.cdn.xsg.ge/gpb-2tv/index.m3u8
#EXTINF:-1,ARENA SPORT 1 🇨🇿
http://88.212.15.19/live/test_arenasport/playlist.m3u8
#EXTINF:-1,Astrakhan.RU Sport HD
http://streaming.astrakhan.ru/astrakhanrusporthd/playlist.m3u8
#EXTINF:-1,BeIN Sport 1 HD 🇶🇦
http://s.only4.tv/5588/index.m3u8
#EXTINF:-1,Bein Sport 3 🇫🇷
http://145.239.5.177:80/559/index.m3u8
#EXTINF:-1,CANAL + Sport 🇫🇷
http://151.80.18.177:86/Canal+_sport_HD/index.m3u8
#EXTINF:-1,Canal+ HD
http://151.80.18.177:86/Canal+_HD/index.m3u8
#EXTINF:-1,Diema Sport
http://213.169.39.30:5134
#EXTINF:-1,Diema Sport 2
http://213.169.39.30:5136
#EXTINF:-1,Diema Sport 3
http://213.169.39.30:5216
#EXTINF:-1,DIGI Sport 1 HD RO
http://46.149.191.217:9000/play/a04d
#EXTINF:-1,Digi Sport 1 🇷🇴
http://91.201.172.14:35005/
#EXTINF:-1,DSPORTS 1 🇦🇷
http://190.117.20.37:8000/play/a08d/index.m3u8
#EXTINF:-1,ESPN 2 🇦🇷
http://191.97.49.82:8001/play/a00m/index.m3u8
#EXTINF:-1,ESPN 2 🇦🇷
http://181.205.130.194:4000/play/a07i
#EXTINF:-1,ESPN 2 🇨🇴
http://200.10.30.241:8000/play/a01r/index.m3u8
#EXTINF:-1,Espn 4
http://181.224.200.5:2277/play/a02o/index.m3u8
#EXTINF:-1,ESPN 🇦🇷
http://45.173.74.2:2010/play/a08a/index.m3u8
#EXTINF:-1,ESPN 🇦🇷
http://181.118.156.46:8000/play/a04g/index.m3u8
#EXTINF:-1,ESPN2
http://41.223.30.230/ESPN2/index.m3u8
#EXTINF:-1,Euro Sport 2 HD
http://79.127.207.193:80/Eurosport2HD/playlist.m3u8
#EXTINF:-1,Euro Sport 2 HD
http://151.80.18.177:86/Eurosport_2_HD/index.m3u8
#EXTINF:-1,FOXONE
http://45.172.92.111:8000/play/a02d/index.m3u8
#EXTINF:-1,FOXONE
http://45.5.119.43:4000/play/a02v/index.m3u8
#EXTINF:-1,FOX CR
http://8.243.126.131:8000/play/a0oq/index.m3u8
#EXTINF:-1,FOXONE
http://8.243.126.131:8000/play/a0ih/index.m3u8
#EXTINF:-1,FOXONE
http://45.228.234.62:8000/play/a05i/index.m3u8
#EXTINF:-1,FOXONE
http://200.229.147.210:9999/play/a0as/index.m3u8
#EXTINF:-1,FOXONE
http://200.229.147.142:8000/play/a03i/index.m3u8
#EXTINF:-1,FOXONE
http://181.119.108.27:7292/play/a02v/index.m3u8
#EXTINF:-1,FOXONE
http://186.33.25.234:8125/play/a04p/index.m3u8
#EXTINF:-1,Directv sport
http://201.240.104.137:8000/play/a0aa/index.m3u8
#EXTINF:-1,Directv sport
http://181.224.255.210:8001/play/a0s8/index.m3u8
#EXTINF:-1,DSPORTS2 HD
http://200.59.188.3:8000/play/a0xe
#EXTINF:-1,TUDN
http://24.152.53.3:8090/play/a012/index.m3u8
#EXTINF:-1,TUDN 4K
http://177.10.184.60:8002/play/a013/index.m3u8
#EXTINF:-1,TUD SD
http://45.171.64.30:8800/play/a07e
#EXTINF:-1,TD+ HD
http://200.229.147.210:9999/play/a00g/index.m3u8
#EXTINF:-1,TD+ HD
http://200.229.147.142:8000/play/a00d/index.m3u8
#EXTINF:-1,TD+ HD
http://200.115.96.66:4000/play/a02i/index.m3u8
#EXTINF:-1,TD+2 HD
http://200.229.147.210:9999/play/a00h/index.m3u8
#EXTINF:-1,TD+2 HD
http://200.229.147.142:8000/play/a00e/index.m3u8
#EXTINF:-1,TD+2 HD
http://200.115.96.66:4000/play/a02h/index.m3u8
#EXTINF:-1,Deportes tvc
http://200.229.147.142:8000/play/a04k/index.m3u8
#EXTINF:-1,Deportes tvc
http://200.229.147.142:8000/play/a05g/index.m3u8
#EXTINF:-1,Deportes tvc
http://200.115.96.66:4000/play/a005/index.m3u8
#EXTINF:-1,Deportes tvc
http://200.115.96.66:4000/play/a001/index.m3u8
#EXTINF:-1,Win Sports
http://181.78.8.199:8000/play/a0cc/index.m3u8
#EXTINF:-1,Win Sports
http://181.78.211.244:8005/play/a0am/index.m3u8
#EXTINF:-1,Win Sports
http://181.78.21.46:8009/play/a02s
#EXTINF:-1,Win Sports+
http://181.78.8.199:8000/play/a06v/index.m3u8
#EXTINF:-1,Win Sports+
http://181.205.205.173:8888/play/a0ul/index.m3u8
#EXTINF:-1,Tigo Sports HD
http://45.5.118.152:8000/play/a08x/index.m3u8
#EXTINF:-1,Tigo Sports+ HD
http://45.171.64.30:2000/play/a08e/index.m3u8
#EXTINF:-1,DSPORTS HD
https://futbol9865.ultratv13.workers.dev/deportivo111/94.m3u8
#EXTINF:-1,DSPORTS2 HD
https://futbol9865.ultratv13.workers.dev/deportivo111/95.m3u8
#EXTINF:-1,МАТЧ! ФУТБOЛ 2HD 🇷🇺
http://193.25.8.59:8000/fut2
#EXTINF:-1,SKY SPORT LALIGA 🇲🇽
http://179.60.224.196:8000/play/a0i7/index.m3u8
#EXTINF:-1,TDM Desporto 🇲🇴
http://cdn6.163189.xyz/163189/amty
#EXTINF:-1,IDMANTV 🇹🇷
https://str2.yodacdn.net/idman_300_to_small/tracks-v1a1/mono.m3u8
#EXTINF:-1,MAX SPORT 4 🇧🇬
http://77.46.130.252:99/maxsport4
#EXTINF:-1,OTT CLUB 🇷🇺
http://czrb8vng.ottclub.xyz/iptv/AHMQNVLWUTM5PW/6554/index.m3u8
#EXTINF:-1,Digi Sport 2 🇷🇴
http://91.201.172.14:35006/
#EXTINF:-1,Матч! 🇷🇺
http://catchup.videoline.ru/match/tracks-v1a1/mono.m3u8
#EXTINF:-1,Матч! 🇷🇺
http://cdntv.online/low/9mlxywika2/48.m3u8
#EXTINF:-1,TNT SPORTS PREMIUM 🇬🇧
http://200.115.120.1:8000/play/ca040/index.m3u8
#EXTINF:-1,BEIN 3 🇫🇷
http://145.239.5.177/559/mpegts
#EXTINF:-1,Матч! 🇷🇺
http://tv.tuva.ru/machtv/index.m3u8
#EXTINF:-1,Матч! 🇷🇺
http://185.46.48.18:80/match/tracks-v1a1/mono.m3u8
#EXTINF:-1,Матч! 🇷🇺
http://5.188.221.43:8080/play/match
#EXTINF:-1,Матч! 🇷🇺
http://95.47.155.244:8001/play/a003
#EXTINF:-1,МАТЧ! ФУТБOЛ 1HD 🇷🇺
http://193.25.8.59:8000/fut
#EXTINF:-1,МАТЧ! ФУТБOЛ 3HD 🇷🇺
http://185.57.68.33/110/mpegts
#EXTINF:-1,Матч! Футбол 3 HD 🇷🇺
http://185.57.68.33:8091/110/playlist.m3u8
#EXTINF:-1,Футбол 3 (SD) 🇷🇺
http://185.57.68.33:80/110/index.m3u8
#EXTINF:-1,Матч! 4 HD 🇷🇺
http://46.149.191.217:9010/play/a019
#EXTINF:-1,Setanta Sport 🇺🇦
http://217.174.225.146/hls/ch004_720/index.m3u8
#EXTINF:-1,Суспільне Kiev Спорт HD 🇺🇦
https://tva.in.ua/live/susp-sport.m3u8
#EXTINF:-1,Super Sport 1 🇦🇱
http://93.93.113.95:25461/TV-Berati/XtreamCodes/494
#EXTINF:-1,Super Sport 2 🇦🇱
http://93.93.113.95:25461/TV-Berati/XtreamCodes/495
#EXTINF:-1,RTSH Sport 🇦🇱
http://217.73.139.200:5443/play/a01d
#EXTINF:-1,NOVA SPORT 1 HD 🇨🇿
http://wo0dyefk.dienalt.org/iptv/DV3AC2Q6YSR9XE/2555/index.m3u8
#EXTINF:-1,CT SPORT HD 🇨🇿
http://88.212.15.19/live/test_ctsport_25p/playlist.m3u8
#EXTINF:-1,SPORT 1 HD 🇨🇿
http://88.212.15.19/live/test_sport1_25p/playlist.m3u8
#EXTINF:-1,SPORT 2 HD 🇨🇿
http://88.212.15.19/live/test_sport_2/playlist.m3u8
#EXTINF:-1,ARENA SPORT 2 🇨🇿
http://88.212.15.19/live/test_arenasport_dva/playlist.m3u8
#EXTINF:-1,MAX SPORT 1 🇧🇬
http://77.46.130.252:99/maxsport1
#EXTINF:-1,MAX SPORT 2 🇧🇬
http://77.46.130.252:99/maxsport2
#EXTINF:-1,MAX SPORT 3 🇧🇬
http://77.46.130.252:99/maxsport3
#EXTINF:-1,M4 Sport 🇭🇺
http://46.149.191.217:9010/play/a017
#EXTINF:-1,Sportdigital 🇩🇪
https://jmp2.uk/stvp-ATAJ0500433A
#EXTINF:-1,ORF+ 🇦🇹
http://212.186.45.34:9981/stream/channelid/906723447
#EXTINF:-1,TELEFE 🇦🇷
http://200.115.120.1:8000/play/ca016/index.m3u8
#EXTINF:-1,WIN SPORT 🇨🇴
http://181.205.205.173:8888/play/a0h0/index.m3u8
#EXTINF:-1,TELEMUNDO 🇲🇽
https://nbculocallive.akamaized.net/hls/live/2037499/puertorico/stream1/master.m3u8
#EXTINF:-1,MTR Sports-1 🇬🇧
https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg02873-kravemedia-mtrspt1-distrotv/playlist.m3u8
#EXTINF:-1,Turkmenistan Sport 🇹🇲
https://alpha.tv.online.tm/legacyhls/ch004_720/index.m3u8
#EXTINF:-1,Turkmenistan Sport 🇹🇲
http://217.174.225.146/legacyhls/ch004_720/index.m3u8
#EXTINF:-1,TR Sport (480p) 🇮🇹
https://livetr.teleromagna.it/mia/live/playlist.m3u8
#EXTINF:-1,L'Equipe 🇫🇷
https://jmp2.uk/stvp-FR200016Y5
#EXTINF:-1,Fox Sports 🇮🇳
http://y3fqd48g.megatv.fun/iptv/NRLXRWSBWBPLN4/19146/index.m3u8
#EXTINF:-1,Sport5 🇮🇱
https://rgelive.akamaized.net/hls/live/2043151/radiolive/playlist.m3u8
#EXTINF:-1,Somoy TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8
#EXTINF:-1,News 24 HD
https://owrcovcrpy.gpcdn.net/bpk-tv/1708/output/index.m3u8
#EXTINF:-1,SATV HD
https://owrcovcrpy.gpcdn.net/bpk-tv/1720/output/index.m3u8
#EXTINF:-1,Channel 9 HD
https://owrcovcrpy.gpcdn.net/bpk-tv/1729/output/index.m3u8
#EXTINF:-1,DBC News
https://owrcovcrpy.gpcdn.net/bpk-tv/1728/output/1728.m3u8
#EXTINF:-1,Ekattor TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1705/output/index.m3u8
#EXTINF:-1,Channel 24
https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8
#EXTINF:-1,Independent TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8
#EXTINF:-1,Jamuna TV
https://owrcovcrpy.gpcdn.net/bpk-tv/1701/output/index.m3u8
#EXTINF:-1,ATN News
https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/index.m3u8
#EXTINF:-1,#EXTVLCOPT:http-user-agent=Mozilla/5.0
https://static.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/atnbd-8-org.stream/playlist.m3u8?wmsAuthSign=|Referer=https://www.jagobd.com/
#EXTINF:-1,#EXTVLCOPT:http-user-agent=Mozilla/5.0
https://static.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/anandatv.stream/playlist.m3u8?wmsAuthSign=|Referer=https://www.jagobd.com/
#EXTINF:-1,NTV
https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8
#EXTINF:-1,BanglaVision
https://owrcovcrpy.gpcdn.net/bpk-tv/1715/output/index.m3u8
#EXTINF:-1,Asian TV
https://mtlivestream.com/hls/asian/ytlive/index.m3u8
#EXTINF:-1,Ekushey TV
http://210.4.72.204/hls-live/livepkgr/_definst_/liveevent/livestream3.m3u8
#EXTINF:-1,Channel I
https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8
#EXTINF:-1,Deepto TV
https://byphdgllyk.gpcdn.net/hls/deeptotv/index.m3u8
#EXTINF:-1,Boishakhi TV
https://boishakhi.sonarbanglatv.com/boishakhi/boishakhitv/index.m3u8
#EXTINF:-1,Bijoy TV
http://main.epgmaker.com/live/y49sz6KMQs/6115263489/581.ts
#EXTINF:-1,Jago News 24
https://app.ncare.live/live-orgin/jagonews24.stream/playlist.m3u8
#EXTINF:-1,MAASRANGA HD
https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8
#EXTINF:-1,#https://bozztv.com/rongo/rongo-DeshTV/index.m3u8
https://bozztv.com/rongo/rongo-DeshTV/tracks-v1a1/mono.m3u8
#EXTINF:-1,Bangla TV
http://116.204.149.16/banglatv/index.m3u8
#EXTINF:-1,#http://tvn3.chowdhury-shaheb.com/rtv/index.m3u8
http://116.204.149.16/rtvhd/index.m3u8
#EXTINF:-1,Green TV
https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI2/greentv.stream/live-orgin/greentv.stream/chunks.m3u8
#EXTINF:-1, Duronto
http://103.204.43.87:8080/live/1/1/290.m3u8
#EXTINF:-1,NICK BANGLA
http://103.204.43.87:8080/live/1/1/275.m3u8
#EXTINF:-1, Sonic Bangla
http://103.204.43.87:8080/live/1/1/274.m3u8
#EXTINF:-1,SRK TV
https://srknowapp.ncare.live/srktvhlswodrm/srktv.stream/playlist.m3u8
#EXTINF:-1,RONGEEN TV
https://server.thelegitpro.in/rongeentv/rongeentv/tracks-v1a1/mono.m3u8
#EXTINF:-1,Makka🔴Live
http://m.live.net.sa:1935/live/quran/playlist.m3u8
#EXTINF:-1,Madina 🔴Live
http://m.live.net.sa:1935/live/sunnah/playlist.m3u8
#EXTINF:-1,Madani TV Bangla
http://103.204.43.87:8080/live/1/1/304.m3u8
#EXTINF:-1,Enter 10 Bangla
https://live-bangla.akamaized.net/liveabr/pub-iobanglakp3sff/live_720p/chunks.m3u8
#EXTINF:-1,#http://stvlive.net:8080/sonyaath/index.m3u8
http://198.195.239.50:8095/SonyAath/tracks-v1a1/mono.m3u8
#EXTINF:-1,Sony Max HD
http://198.195.239.50:8095/SonyMAX/tracks-v1a1/mono.m3u8
#EXTINF:-1, SONY MAX 2
http://maxotts.maxdigitaltv.com/x-media/C111/master.m3u8
#EXTINF:-1,Gazi TV
https://tvsen1.aynaott.com/Ravc7gPCZpxk/index.m3u8
#EXTINF:-1,NAGORIK HD
http://198.195.239.50:8095/nagorik/index.m3u8
#EXTINF:-1,T Sports HD
http://198.195.239.50:8095/Tsports/tracks-v1a1/mono.m3u8
#EXTINF:-1,A Sports HD
http://103.204.43.87:8080/live/1/1/309.m3u8
#EXTINF:-1,PTV Sports
http://103.204.43.87:8080/live/1/1/313.m3u8
#EXTINF:-1,Willow
http://main.epgmaker.com/live/y49sz6KMQs/6115263489/517.ts
#EXTINF:-1,FOX SPORTS 501 HD
http://sewv654wfcsdwfi87fwvgbngh.siauliairsavlt.pw/iptv/VCQ4ADX96VH4G8PY7URBWRQU/19146/index.m3u8
#EXTINF:-1,SKY SPORTS CRICKET
http://sewv654wfcsdwfi87fwvgbngh.siauliairsavlt.pw/iptv/VCQ4ADX96VH4G8PY7URBWRQU/9258/index.m3u8
#EXTINF:-1,SONY SPORTS 1HD
http://stalker.hakunamata.workers.dev/play/1101/index.m3u8
#EXTINF:-1,SONY SPORTS 2 HD 🅰️
http://103.204.43.87:8080/live/1/1/304.m3u8
#EXTINF:-1,SONY SPORTS 2 HD 🅱️
http://main.epgmaker.com/live/y49sz6KMQs/6115263489/513.ts
#EXTINF:-1,SONY SPORTS 5 HD
http://66.102.126.10:8000/play/a010/index.m3u8
#EXTINF:-1, Star Sports 1 HD
http://103.204.43.87:8080/live/1/1/258.m3u8
#EXTINF:-1, Star Sports 2 HD
http://103.204.43.87:8080/live/1/1/255.m3u8
#EXTINF:-1,STAR SPORTS SELECT 1 HD
http://103.204.43.87:8080/live/1/1/244.m3u8
#EXTINF:-1,STAR SPORTS SELECT 2 HD
http://103.204.43.87:8080/live/1/1/243.m3u8
#EXTINF:-1, Sangeet Bangla
https://cdn-4.pishow.tv/live/1143/master.m3u8
#EXTINF:-1,#https://cdn-2.pishow.tv/live/226/master.m3u8
http://103.180.212.191:3500/live/250.m3u8
#EXTINF:-1, Discovery HD Bengali
http://103.159.180.34:5001/live/3428.m3u8
#EXTINF:-1, Discovery Bengali
http://103.159.180.34:5001/live/573.m3u8
#EXTINF:-1,STABLE-SPORTS TV
http://198.195.239.50:8095/StarSports2/tracks-v1a1/mono.m3u8
#EXTINF:-1,Toffee {premium}
http://main.epgmaker.com/live/y49sz6KMQs/6115263489/522.ts
#EXTINF:-1,Prince [2026]
https://yellow-flower-41fc.cinepixserver00.workers.dev/1:/22-5-26/ottboxbd.COM%20-%20Prince%20Once%20Upon%20a%20Time%20in%20Dhaka%202026%20Bengali%20ORG%201080p%20WEB-DL%20x264.mkv
#EXTINF:-1,Domm [2026]
https://yellow-flower-41fc.cinepixserver00.workers.dev/1:/21-5-26/Domm%202026%20Bengali%20(ORG)%201080p%20WEB-DL%20x264%20ESubs.mkv
#EXTINF:-1,Rakkhosh [2026]
http://103.203.93.4/Dhallywood%20(Bangladeshi)/2026/RAKKHOSH%20Bangla%20Movie%20SIAM/Rakkhosh%20(2026)%20Bengali%20720p%20HD-Camrip.mp4
#EXTINF:-1,Bonolota Express [2026]
http://103.203.93.4/Dhallywood%20(Bangladeshi)/2026/Bonolota%20Express%20(2026)/Bonolota%20Express%20(2026)%20Bengali%20Amazon%20WEB-DL%20H264%20AAC%20720p.mkv
#EXTINF:-1,STABLE-SPORTS TV
http://198.195.239.50:8095/StarSports2/tracks-v1a1/mono.m3u8
#EXTINF:-1,Colors Bangla HD
http://main.epgmaker.com/live/y49sz6KMQs/6115263489/532.ts
#EXTINF:-1,ZEE Bangla HD
http://main.epgmaker.com/live/y49sz6KMQs/6115263489/536.ts
`;

export const FIFA_4_M3U = `#EXTM3U
#EXTINF:-1,FIFA World Cup 2026
https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8
#EXTINF:-1,FIFA World Cup 2026
https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/1702-audio_113322_eng=113200-video=2202800.m3u8
#EXTINF:-1,FIFA World Cup 2026 🇦🇷[coming]
http://cdn.tv-rds.workers.dev/TYCSPT.m3u8
#EXTINF:-1,FIFA World Cup 2026 🇧🇷[coming]
https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/1080p-vtt/index.m3u8
#EXTINF:-1,FIFA World Cup 2026 🇮🇳[coming]
http://66.102.126.10:8000/play/a076/index.m3u8
#EXTINF:-1,FIFA World Cup 2026 🇮🇳[coming]
http://66.102.126.10:8000/play/a022/index.m3u8
#EXTINF:-1,#http://66.102.126.10:8000/play/a076/index.m3u8
http://103.204.43.87:8080/live/1/1/266.m3u8
#EXTINF:-1,#http://66.102.126.10:8000/play/a022/index.m3u8
http://103.204.43.87:8080/live/1/1/264.m3u8
#EXTINF:-1,FIFA World Cup 2026 🇵🇰[coming]
http://103.204.43.87:8080/live/1/1/313.m3u8
#EXTINF:-1,FIFA World Cup 2026 [coming]
https://a62dad94.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlblRWLWV1X0ZJRkFQbHVzRW5nbGlzaF9ITFM/playlist.m3u8`;

// Initialize base default lists loaded in React runtime
const baseDefault = parseM3u(RAW_M3U_TEXT);
const fifa1 = parseM3u(FIFA_1_M3U, "Fifa world cup 1");
const fifa2 = parseM3u(FIFA_2_M3U, "Fifa world cup 2");
const fifa3 = parseM3u(FIFA_3_M3U, "Fifa world cup 3");
const fifa4 = parseM3u(FIFA_4_M3U, "Fifa world cup 3"); // merge FIFA 4 into Fifa world cup 3 perfectly

export const DEFAULT_CHANNELS: Channel[] = [
  ...fifa1,
  ...fifa2,
  ...fifa3,
  ...fifa4,
  ...baseDefault
];
