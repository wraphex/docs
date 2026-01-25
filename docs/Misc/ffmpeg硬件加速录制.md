# ffmpeg硬件加速录制

vaapi

ffmpeg -vaapi_device /dev/dri/renderD128 \
-input_format yuyv422 \
-video_size 1280x720 \
-i /dev/video1 \
-vf "hwupload,scale_vaapi=format=nv12" \
-c:v h264_vaapi \
output.mp4

[https://trac.ffmpeg.org/wiki/Hardware/VAAPI#Encode-only](https://trac.ffmpeg.org/wiki/Hardware/VAAPI#Encode-only)

[https://github.com/AlexxIT/go2rtc?tab=readme-ov-file#source-ffmpeg](https://github.com/AlexxIT/go2rtc?tab=readme-ov-file#source-ffmpeg)

[https://docs.frigate-cn.video/](https://docs.frigate-cn.video/)