export class VideoSDKMeeting {
  /**
   * ---
   * @param name - Name of the participant who will be joining the meeting, this name will be displayed to other participants in the same meeting.
   * ---
   * @param apiKey - ApiKey of Video SDK generated from [app.videosdk.live/api-keys] (https://app.videosdk.live/api-keys)
   * ---
   * @param meetingId -
   * - Unique Id of the meeting where that participant will be joining.
   *
   * - You can enter any arbitrary meetingId or an id generated with the reference of [Create-Room] (https://docs.videosdk.live/api-reference/realtime-communication/create-room).
   * ---
   * @param containerId -
   * - In the containerId you need to specify an id of your dom element which will help you rendering your meeting in that particular portion which could be your entire page or any element of a page.
   *
   * - If nothing provided, then the meeting will be rendered in full screen.
   * ---
   * @param redirectOnLeave -
   * - You can redirect participant to the specified url after they leave the meeting.
   * ---
   * @param micEnabled - Whether mic of the participant will be on while joining the meeting. If it is set to false,
   * then mic of that participant will be disabled by default, but can be enabled or disabled later.
   * ---
   * @param webcamEnabled - Whether webcam of the participant will be on while joining the meeting. If it is set to false,
   * then webcam of that participant will be disabled by default, but can be enabled or disabled later.
   * ---
   * @param participantCanToggleSelfWebcam - While participantCanToggleSelfWebcam value is set to true, participant can enable/disable self webcam.
   * ---
   * @param participantCanToggleSelfMic - While participantCanToggleSelfMic value is set to true, participant can enable/disable self mic.
   * ---
   * @param participantCanLeave - When you set to true, then leave button will be visible on topbar of meeting layout.
   * ---
   * @param chatEnabled - When you set to true, then participant will be able to chat during the meeting.
   * ---
   * @param screenShareEnabled - When you set to true, then participant will be able to share their screen in the meeting.
   * ---
   * @param whiteboardEnabled - When you set to true, then participant will be able to see the white board status.
   * ---
   * @param raiseHandEnabled - When you set to true, then participant will be able to raise his/her hand in the meeting
   * ---
   * @param pollEnabled - When you set to true, you are able to see poll option in `More Options` side panel.
   * ---
   * @param moreOptionsEnabled - Whether you want to see/hide More Options button. If you set to false button will be hide.
   *
   * - By default value set to true
   * ---
   * @param networkBarEnabled - Wheather you want to see/hide network bar at top right corner of participant video.
   * ---
   * @param participantTabPanelEnabled - Setting to true will show an participant tab panel in the meeting.
   * ---
   * @param maxResolution - You can sets the max webcam resolution which can either be hd | sd.
   * ---
   * @param debug - Setting to true will show an error which may cause during the meeting.
   * ---
   * @param mode -
   *
   * - There are 2 types of modes:
   *
   * - **CONFERENCE**: Both audio and video streams will be produced and consumed in this mode.
   *
   * - **VIEWER**: Audio and video streams will not be produced or consumed in this mode.
   *
   * - defaultValue : **CONFERENCE**
   * ---
   * @param participantId - If you want specify participantId explicitly then you can pass it here.
   * ---
   * @param joinWithoutUserInteraction - Partcipant can directly join the meeting if joinWithoutUserInteraction set to true.
   * ---
   * @param maintainVideoAspectRatio - Participant videos will maintain the aspect ratio if true, so if the video stream is portrait it will be shown as portrait.
   *
   * - By default is set to true.
   * ---
   * @param maintainLandscapeVideoAspectRatio - Participant videos will maintain the aspect ratio if true, so if the video stream is landscape it will be shown as landscape.
   * ---
   * @param notificationSoundEnabled - Wheather you want to hear or mute notification sound during the meeting you can specify here.
   * ---
   * @param joinScreen - To configure join screen feature, you need to add join screen object in meeting config.
   *
   * @param joinScreen.visible - If you want to show join screen before the start of the meeting set it true otherwise false.
   *
   * @param joinScreen.title - Here you can specify meeting title that display on join screen.
   *
   * @param joinScreen.meetingUrl - You can specify meeting join url, where your meeting will be hosted.
   * ---
   * @param layout - You can specify meeting layout wheather you want GRID , SIDEBAR or SPOTLIGHT.
   *
   * @param layout.type - It represents the type of layout which can be SPOTLIGHT | SIDEBAR | GRID.
   *
   * @param layout.priority - It represents the priority of layout type which can be SPEAKER | PIN.
   *
   * @param layout.gridSize - It represents the maximum participants to be shown on the meeting screen. Max value should be 25.
   * ---
   * @param branding - You can embed your branding to top of the meeting.
   *
   * @param branding.enabled - If you set to true, then branding will be visible on topbar of the meeting layout.
   *
   * @param branding.logoURL - Here you can pass url of your brand logo, to be shown on the topbar of the meeting screen layout.
   *
   * @param branding.name - It represents your brand name, that will be shown on the topbar of the meeting screen layout.
   *
   * @param branding.poweredBy - If it is true, powered by videosdk.live will be shown below the branch name else it eill be hidden.
   * ---
   * @param hls - This feature allows participant to broadcast live streaming to other participants.
   *
   * @param hls.enabled - When set to true , you can see Start HLS button.
   *
   * @param hls.autoStart - If you set to true then HLS will start automatically when the meeting starts, default value is false (You can't start HLS during the meeting).
   *
   * @param hls.theme - You can HLS the meeting based on theme you are passing. it can be a either DARK , LIGHT or DEFAULT.
   *
   * @param hls.playerControlsVisible - If it is set to true then participant can view controls for the interactive meeting player.
   * ---
   * @param livestream - Livestreaming allows participant to broadcast meeting on various social media platforms such as Facebook or Youtube.
   *
   * @param livestream.enabled - It enables partcipant for live streaming.
   *
   * @param livestream.autostart - It automatically start live streaming if set to true when meeting gets started.
   *
   * @param livestream.theme - You can specify theme of live streaming which can be DARK , LIGHT or DEFAULT.
   *
   * @param livestream.outputs - It is json object array.
   *
   * - type: { url: String, streamKey: String }[]
   *
   * - Here you have to mention your streamKey and url of live streaming platform.
   * ---
   * @param recording - You can record audio & video during the meeting.
   *
   * @param recording.enabled - It enables partcipant to record the meeting.
   *
   * @param recording.webhookUrl - It represents web hook url called when the recording of the meeting is created.
   *
   * @param recording.awsDirPath - You can specify the path where recording will get stored.
   *
   * @param recording.autostart - If set to true as the meeting start, recording will start automatically.
   *
   * @param recording.theme - It represents the theme of recording which can be DARK , LIGHT or DEFAULT.
   * ---
   * @param realtimeTranscription - You can transcript audio & video call during the meeting.
   *
   * @param realtimeTranscription.enabled - It enables partcipant to transcript the meeting.
   *
   * @param realtimeTranscription.visible - It represents transcription text is visible to participant or not.
   * ---
   * @param leftScreen - Left screen will be shown when participant left the meeting if redirectOnLeave parameter is not provided while initializing the meeting.
   *
   * @param leftScreen.actionButton - You can customize button on left screen page by passing {href,label}.
   *
   * - href : URL of a customized action button
   * - label : label of type String of a customized action button
   *
   * @param leftScreen.rejoinButtonEnabled - If it is set to true then rejoin button will be appeared on the screen else it will be nonapparent.
   * ---
   * @param waitingScreen - You can customize waiting screen.
   *
   * @param waitingScreen.imageURL - You can pass url of your lottie or image, to be shown on the waiting screen.
   *
   * @param waitingScreen.text - You can write your customize message, that will be shown on the waiting screen.
   * ---
   * @param videoConfig - You can customize video by pass resolution, optimization mode for associated video configuration.
   *
   * @param videoConfig.resolution - It represents the resolution of your video.
   *
   * - which can be h90p_w160p , h180p_w320p , h216p_w384p , h360p_w640p , h540p_w960p , h720p_w1280p , h1080p_w1920p , h1440p_w2560p , h2160p_w3840p , h120p_w160p , h180p_w240p ,
   * h240p_w320p , h360p_w480p , h480p_w640p , h540p_w720p , h720p_w960p , h1080p_w1440p or h1440p_w1920p.
   *
   * @param videoConfig.optimizationMode - It represents the specific mode of your video which can be motion , text or detail.
   *
   * @param videoConfig.multiStream - If it is true, multiple resolution layers are send in single video stream. If it is false, then only single resolution layer is send in video stream.
   * ---
   * @param audioConfig - You can customize audio by setting qulaity of audio.
   *
   * @param audioConfig.quality - audioConfig.quality- You can set quality value to speech_low_quality , speech_standard or high_quality.
   *
   * - By default quality is set to speech_standard. If you want to know more values of quality then checkout this [Prebuilt SDK Referenece] (https://docs.videosdk.live/prebuilt/api/sdk-reference/parameters/advance-parameters/customize-audio-video#quality).
   * ---
   * @param screenShareConfig - You can customize screen share by pass resolution, optimization mode for associated screen sharing configuration.
   *
   * @param screenShareConfig.resolution - You can set resolution of your screen shared video.
   *
   * - Which can be h360p_30fps, h720p_5fps, h720p_15fps, h1080p_15fps, h1080p_30fps.
   *
   * @param screenShareConfig.optimizationMode -  You can specify mode of your screen shared video which can be motion , text or detail.
   * ---
   * @param permissions - You can pass meeting join , webcam and mic permission for participants , poll , whiteboard etc.
   *
   * @param permissions.pin - You can set participant can be pin other self or participants or not.
   *
   * @param permissions.askToJoin - It represents whether participant can request to join in the meeting or not.
   *
   * - If it is false, then participant will directly join the meeting
   *
   * @param permissions.toggleParticipantWebcam - It represents whether participant can toggle other participant's webcam or not.
   *
   * @param permissions.toggleParticipantMic - It represents whether participant can toggle other participant's mic or not.
   *
   * @param permissions.toggleParticipantMode - It represents whether participant can toggle other participant's mode or not.
   *
   * @param permissions.toggleParticipantScreenshare - It represents whether participant can toggle other participant's screen share or not.
   *
   * @param permissions.canToggleParticipantTab - It represents whether participant can toggle participant tab panel or not.
   *
   * @param permissions.removeParticipant - It  represents whether participant can remove other participant or not.
   *
   * @param permissions.canCreatePoll - You can pass whether participant can create a poll or not.
   *
   * @param permissions.endMeeting - If is set to true, then participant can end the meeting and all joined participants will be removed from the meeting.
   *
   * @param permissions.drawOnWhiteboard - It represents whether participant have permission to draw on white board or not.
   *
   * @param permissions.toggleWhiteboard - It enables participant to toggle white board if set to true.
   *
   * @param permissions.toggleVirtualBackground - It enables participant to see virtual background option if set to true.
   *
   * @param permissions.toggleRecording - It eenables participant to change the layout of a meeting when set to truenables participant to toggle recording if set to true.
   *
   * @param permissions.toggleLivestream - It enables participant to toggle live streaming if set to true.
   *
   * @param permissions.changeLayout - It enables participant to change the layout of a meeting when set to true.
   *
   * @param permissions.toggleParticipantMode - It represents whether participant can toggle other participant's mode or not.
   *
   * @param permissions.toggleHLS - If set to true you can toggle Start HLS Button.
   *
   * @param permissions.toggleRealtimeTranscription - enables participant to toggle realtime transcription if set to true
   * ---
   *
   */
  init(config: {
    name: string;
    apiKey: string;
    meetingId: string;
    containerId?: string;
    redirectOnLeave?: string;
    micEnabled?: boolean;
    webcamEnabled?: boolean;
    participantCanToggleSelfWebcam?: boolean;
    participantCanToggleSelfMic?: boolean;
    participantCanLeave?: boolean;
    chatEnabled?: boolean;
    screenShareEnabled?: string;
    whiteboardEnabled?: boolean;
    raiseHandEnabled?: boolean;
    pollEnabled?: boolean;
    moreOptionsEnabled?: boolean;
    networkBarEnabled?: boolean;
    participantTabPanelEnabled?: boolean;
    maxResolution?: string;
    debug?: boolean;
    mode?: string;
    participantId?: string;
    joinWithoutUserInteraction?: boolean;
    maintainVideoAspectRatio?: boolean;
    maintainLandscapeVideoAspectRatio?: boolean;
    notificationSoundEnabled?: boolean;
    joinScreen?: {
      visible: boolean;
      title: string;
      meetingUrl: string;
    };
    branding?: {
      enabled: boolean;
      logoURL: string;
      name: string;
      poweredBy: boolean;
    };
    hls?: {
      enabled: boolean;
      autostart: boolean;
      playerControlsVisible: boolean;
      theme: string;
    };
    livestream?: {
      enabled: boolean;
      autostart: boolean;
      theme: string;
      outputs: [
        {
          url: string;
          streamKey: string;
        }
      ];
    };
    recording?: {
      enabled: boolean;
      autostart: boolean;
      webhookUrl: string;
      awsDirPath: string;
      theme: string;
    };
    realtimeTranscription: {
      enabled: boolean;
      visible: boolean;
    };
    leftScreen?: {
      actionButton: {
        label: string;
        href: string;
      };
      rejoinButtonEnabled: boolean;
    };
    waitingScreen?: {
      imageURL: string;
      text: string;
    };
    videoConfig?: {
      resolution: string;
      optimizationMode: string;
      multiStream: boolean;
    };
    audioConfig?: {
      quality: string;
    };
    screenShareConfig?: {
      resolution: string;
      optimizationMode: string;
    };
    permissions?: {
      pin: boolean;
      askToJoin: boolean;
      toggleParticipantWebcam: boolean;
      toggleHLS: boolean;
      toggleParticipantMic: boolean;
      toggleParticipantMode: boolean;
      toggleParticipantScreenshare: boolean;
      canToggleParticipantTab: boolean;
      removeParticipant: boolean;
      canCreatePoll: boolean;
      endMeeting: boolean;
      drawOnWhiteboard: boolean;
      toggleWhiteboard: boolean;
      toggleVirtualBackground: boolean;
      toggleRecording: boolean;
      toggleRealtimeTranscription: boolean;
      toggleLivestream: boolean;
      changeLayout: boolean;
    };
  }): void;
}
