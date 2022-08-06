export class VideoSDKMeeting {
  async init({ containerId, ...rest } = {}) {
    let myDocument = parent.document;
    let myWindow = parent.window;

    if (typeof myWindow === "undefined" || typeof myDocument === "undefined") {
      throw new Error("No browser detected!");
    }

    const prebuiltSrc = await this.generatePrebuiltSrc(
      rest,
      myWindow,
      myDocument
    );

    let iframe_id = "videosdk-frame";

    let meetingFrame = myDocument.createElement("iframe");
    meetingFrame.id = iframe_id;

    meetingFrame.src = prebuiltSrc;
    meetingFrame.allowfullscreen = true;
    meetingFrame.width = "100%";
    meetingFrame.height = "100%";
    meetingFrame.allow =
      "camera *; microphone *; fullscreen; display-capture; allow-same-origin; allow-presentation; encrypted-media; midi; encrypted-media ";
    meetingFrame.style.border = 0;
    meetingFrame.allowusermedia = "allowusermedia";

    let iframeContainer = null;

    if (containerId) {
      let container = myDocument.getElementById(containerId);
      if (!container) {
        throw new Error(`No Container found with id ${containerId}`);
      }
      iframeContainer = container;
      container.appendChild(meetingFrame);
    } else {
      let container = myDocument.createElement("div");
      container.style.position = "fixed";
      container.style.left = 0;
      container.style.right = 0;
      container.style.bottom = 0;
      container.style.top = 0;
      // container.style.backgroundColor = "#212032";
      iframeContainer = container;
      container.appendChild(meetingFrame);

      myDocument.body.style.margin = "0px";
      myDocument.body.style.padding = "0px";
      myDocument.body.style.height = "100%";
      myDocument.body.style.overflow = "hidden";

      myDocument.body.appendChild(container);
    }

    myWindow.addEventListener("popstate", function (e) {
      iframeContainer.remove();
    });
  }

  async fetchToken({ apiKey, askJoin, apiBaseUrl }) {
    let BASE_URL = apiBaseUrl || "https://api.videosdk.live";

    let urlToken = `${BASE_URL}/v1/prebuilt/token`;

    let permissions = [];

    if (askJoin) {
      permissions.push("ask_join");
    } else {
      permissions.push("allow_join");
    }

    let tokenBody = { apiKey: apiKey };

    if (permissions.length) {
      tokenBody["permissions"] = permissions;
    }

    let res = await fetch(urlToken, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(tokenBody),
    });

    let token;

    if (res.status === 200) {
      let json = await res.json();

      token = json.token;
    } else {
      throw new Error("Could not fetch token.");
    }

    return token;
  }

  async generatePrebuiltSrc(
    {
      name,
      apiKey,
      meetingId,
      token,

      region,
      preferredProtocol,

      redirectOnLeave,

      micEnabled,
      webcamEnabled,
      participantCanToggleSelfWebcam,
      participantCanToggleSelfMic,

      participantCanLeave,
      chatEnabled,
      screenShareEnabled,
      pollEnabled,
      whiteboardEnabled,
      raiseHandEnabled,

      branding,

      livestream,

      recording,

      hls,

      permissions: initPermissions,

      joinScreen,

      leftScreen,

      layout,

      maxResolution,

      debug,

      isRecorder,

      maintainVideoAspectRatio,
      networkBarEnabled,

      participantId,
      meetingLayoutTopic,
      joinWithoutUserInteraction,

      notificationSoundEnabled,
      notificationAlertsEnabled,
      animationsEnabled,
      topbarEnabled,
      hideLocalParticipant,
      alwaysShowOverlay,
      sideStackSize,
      reduceEdgeSpacing,
      embedBaseUrl: _embedBaseUrl,
      apiBaseUrl,
      mode,
    } = {},
    myWindow
  ) {
    // START VARIABLE INIT

    if (!livestream) livestream = {};
    if (!initPermissions) initPermissions = {};
    if (!joinScreen) joinScreen = {};
    if (!leftScreen) leftScreen = {};
    if (!layout) layout = {};
    if (!recording) recording = {};
    if (!hls) hls = {};
    if (!branding) branding = {};

    let {
      askToJoin: askJoin,
      toggleParticipantWebcam: participantCanToggleOtherWebcam,
      toggleParticipantMic: participantCanToggleOtherMic,
      toggleParticipantScreenshare: partcipantCanToogleOtherScreenShare,
      toggleParticipantMode: participantCanToggleOtherMode,
      removeParticipant: canRemoveOtherParticipant,
      endMeeting: participantCanEndMeeting,
      drawOnWhiteboard: canDrawOnWhiteboard,
      toggleWhiteboard: canToggleWhiteboard,
      toggleRecording: participantCanToggleRecording,
      toggleLivestream: participantCanToggleLivestream,
      toggleHls: participantCanToggleHls,
      pin: canPin,
      changeLayout: canChangeLayout,
      canCreatePoll: canCreatePoll,
    } = initPermissions;

    if (askJoin) {
      participantCanToggleOtherWebcam = false;
      participantCanToggleOtherMic = false;
      partcipantCanToogleOtherScreenShare = false;
    }

    let {
      enabled: liveStreamEnabled,
      autoStart: autoStartLiveStream,
      outputs: liveStreamOutputs,
    } = livestream;

    let {
      visible: joinScreenEnabled,
      meetingUrl: joinScreenMeetingUrl,
      title: joinScreenTitle,
    } = joinScreen;

    let {
      actionButton: leftScreenActionButton,
      rejoinButtonEnabled: leftScreenRejoinButtonEnabled,
    } = leftScreen;

    leftScreenActionButton = leftScreenActionButton || {};

    let {
      label: leftScreenActionButtonLabel,
      href: leftScreenActionButtonHref,
    } = leftScreenActionButton;

    let {
      type: layoutType,
      priority: layoutPriority,
      gridSize: layoutGridSize,
    } = layout;

    let {
      enabled: recordingEnabled,
      webhookUrl: recordingWebhookUrl,
      awsDirPath: recordingAWSDirPath,
      autoStart: autoStartRecording,
    } = recording;

    const {
      enabled: hlsEnabled,
      autoStart: autoStartHls,
      playerControlsVisible: hlsPlayerControlsVisible,
    } = hls;

    let {
      enabled: brandingEnabled,
      logoURL: brandLogoURL,
      name: brandName,
      poweredBy,
    } = branding;

    // END VARIABLE INIT

    if (!token && !apiKey) {
      throw new Error(`Any one of "token" or "apiKey" must be provided.`);
    }

    token = token || (await this.fetchToken({ apiKey, askJoin, apiBaseUrl }));

    const rawUserAgent = myWindow?.navigator?.userAgent;

    const prebuiltSrcQueryParameters = [
      { key: "micEnabled", value: micEnabled ? "true" : "false" },
      { key: "webcamEnabled", value: webcamEnabled ? "true" : "false" },
      { key: "name", value: name },
      { key: "meetingId", value: meetingId || "" },

      { key: "region", value: region || "sg001" },
      { key: "preferredProtocol", value: preferredProtocol || "UDP_ONLY" },

      { key: "canChangeLayout", value: canChangeLayout ? "true" : "false" },
      { key: "meetingId", value: meetingId || "" },
      { key: "redirectOnLeave", value: redirectOnLeave || "" },
      { key: "chatEnabled", value: chatEnabled ? "true" : "false" },
      {
        key: "screenShareEnabled",
        value: screenShareEnabled ? "true" : "false",
      },
      { key: "pollEnabled", value: pollEnabled ? "true" : "false" },
      { key: "whiteboardEnabled", value: whiteboardEnabled ? "true" : "false" },
      {
        key: "participantCanToggleSelfWebcam",
        value: participantCanToggleSelfWebcam ? "true" : "false",
      },
      {
        key: "participantCanToggleSelfMic",
        value: participantCanToggleSelfMic ? "true" : "false",
      },
      { key: "raiseHandEnabled", value: raiseHandEnabled ? "true" : "false" },
      { key: "token", value: token || "" },
      { key: "recordingEnabled", value: recordingEnabled ? "true" : "false" },
      { key: "recordingWebhookUrl", value: recordingWebhookUrl || "" },
      { key: "recordingAWSDirPath", value: recordingAWSDirPath || "" },
      {
        key: "autoStartRecording",
        value: autoStartRecording ? "true" : "false",
      },
      {
        key: "participantCanToggleRecording",
        value:
          typeof participantCanToggleRecording === "boolean"
            ? participantCanToggleRecording
              ? "true"
              : "false"
            : false,
      },
      { key: "brandingEnabled", value: brandingEnabled ? "true" : "false" },
      { key: "brandLogoURL", value: brandLogoURL || "" },
      { key: "brandName", value: brandName },
      {
        key: "participantCanLeave",
        value:
          typeof participantCanLeave === "boolean"
            ? participantCanLeave
              ? "true"
              : "false"
            : "true",
      },
      {
        key: "poweredBy",
        value:
          typeof poweredBy === "boolean"
            ? poweredBy
              ? "true"
              : "false"
            : "true",
      },
      { key: "liveStreamEnabled", value: liveStreamEnabled ? "true" : "false" },
      {
        key: "autoStartLiveStream",
        value: autoStartLiveStream ? "true" : "false",
      },
      {
        key: "liveStreamOutputs",
        value: JSON.stringify(liveStreamOutputs || []),
      },
      {
        key: "participantCanToggleOtherMic",
        value: participantCanToggleOtherMic ? "true" : "false",
      },

      {
        key: "partcipantCanToogleOtherScreenShare",
        value: partcipantCanToogleOtherScreenShare ? "true" : "false",
      },
      {
        key: "participantCanToggleOtherWebcam",
        value: participantCanToggleOtherWebcam ? "true" : "false",
      },
      {
        key: "participantCanToggleOtherMode",
        value: participantCanToggleOtherMode ? "true" : "false",
      },
      { key: "askJoin", value: askJoin ? "true" : "false" },
      { key: "joinScreenEnabled", value: joinScreenEnabled ? "true" : "false" },
      { key: "joinScreenMeetingUrl", value: joinScreenMeetingUrl || "" },
      { key: "joinScreenTitle", value: joinScreenTitle || "" },
      {
        key: "notificationSoundEnabled",
        value:
          typeof notificationSoundEnabled === "boolean"
            ? notificationSoundEnabled
              ? "true"
              : "false"
            : "true",
      },
      { key: "canPin", value: canPin ? "true" : "false" },
      { key: "canCreatePoll", value: canCreatePoll ? "true" : "false" },
      { key: "layoutType", value: layoutType },
      { key: "mode", value: mode },
      {
        key: "participantCanEndMeeting",
        value:
          typeof participantCanEndMeeting === "boolean"
            ? participantCanEndMeeting
              ? "true"
              : "false"
            : "false",
      },
      {
        key: "canDrawOnWhiteboard",
        value:
          typeof canDrawOnWhiteboard === "boolean"
            ? canDrawOnWhiteboard
              ? "true"
              : "false"
            : "true",
      },
      {
        key: "canToggleWhiteboard",
        value:
          typeof canToggleWhiteboard === "boolean"
            ? canToggleWhiteboard
              ? "true"
              : "false"
            : "true",
      },
      {
        key: "canRemoveOtherParticipant",
        value:
          typeof canRemoveOtherParticipant === "boolean"
            ? canRemoveOtherParticipant
              ? "true"
              : "false"
            : "false",
      },
      {
        key: "leftScreenActionButtonLabel",
        value: leftScreenActionButtonLabel,
      },
      { key: "leftScreenActionButtonHref", value: leftScreenActionButtonHref },
      { key: "maxResolution", value: maxResolution || "sd" },
      {
        key: "animationsEnabled",
        value:
          typeof animationsEnabled === "boolean" ? animationsEnabled : true,
      },
      {
        key: "topbarEnabled",
        value: typeof topbarEnabled === "boolean" ? topbarEnabled : true,
      },
      {
        key: "notificationAlertsEnabled",
        value:
          typeof notificationAlertsEnabled === "boolean"
            ? notificationAlertsEnabled
            : true,
      },
      { key: "debug", value: typeof debug === "boolean" ? debug : false },
      { key: "participantId", value: participantId || "" },
      { key: "layoutPriority", value: layoutPriority || "" },
      { key: "layoutGridSize", value: layoutGridSize || "0" },
      {
        key: "hideLocalParticipant",
        value:
          typeof hideLocalParticipant === "boolean"
            ? hideLocalParticipant
              ? "true"
              : "false"
            : "false",
      },
      {
        key: "alwaysShowOverlay",
        value:
          typeof alwaysShowOverlay === "boolean"
            ? alwaysShowOverlay
              ? "true"
              : "false"
            : "false",
      },
      { key: "sideStackSize", value: sideStackSize },
      {
        key: "reduceEdgeSpacing",
        value:
          typeof reduceEdgeSpacing === "boolean"
            ? reduceEdgeSpacing
              ? "true"
              : "false"
            : "false",
      },
      {
        key: "isRecorder",
        value:
          typeof isRecorder === "boolean"
            ? isRecorder
              ? "true"
              : "false"
            : "false",
      },
      {
        key: "maintainVideoAspectRatio",
        value:
          typeof maintainVideoAspectRatio === "boolean"
            ? maintainVideoAspectRatio
              ? "true"
              : "false"
            : "true",
      },
      {
        key: "networkBarEnabled",
        value:
          typeof networkBarEnabled === "boolean"
            ? networkBarEnabled
              ? "true"
              : "false"
            : "true",
      },
      {
        key: "leftScreenRejoinButtonEnabled",
        value:
          typeof leftScreenRejoinButtonEnabled === "boolean"
            ? leftScreenRejoinButtonEnabled
              ? "true"
              : "false"
            : "true",
      },
      {
        key: "joinWithoutUserInteraction",
        value:
          typeof joinWithoutUserInteraction === "boolean"
            ? joinWithoutUserInteraction
              ? "true"
              : "false"
            : "false",
      },
      { key: "rawUserAgent", value: rawUserAgent || "" },
      { key: "meetingLayoutTopic", value: meetingLayoutTopic || "" },
      {
        key: "canChangeLayout",
        value:
          typeof canChangeLayout === "boolean"
            ? canChangeLayout
              ? "true"
              : "false"
            : "false",
      },
      {
        key: "participantCanToggleLivestream",
        value:
          typeof participantCanToggleLivestream === "boolean"
            ? participantCanToggleLivestream
              ? "true"
              : "false"
            : "false",
      },
      { key: "hlsEnabled", value: hlsEnabled ? "true" : "false" },
      {
        key: "autoStartHls",
        value: autoStartHls ? "true" : "false",
      },
      {
        key: "participantCanToggleHls",
        value:
          typeof participantCanToggleHls === "boolean"
            ? participantCanToggleHls
              ? "true"
              : "false"
            : "false",
      },

      {
        key: "hlsPlayerControlsVisible",
        value:
          typeof hlsPlayerControlsVisible === "boolean"
            ? hlsPlayerControlsVisible
              ? "true"
              : "false"
            : "false",
      },
    ]
      .map(({ key, value }) => {
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join("&");

    const embedBaseUrl = _embedBaseUrl
      ? _embedBaseUrl
      : // : "http://localhost:3000/rtc-js-prebuilt/pre-0.3.10/";

        "https://embed.videosdk.live/rtc-js-prebuilt/0.3.14/";

    const prebuiltSrc = `${embedBaseUrl}/?${prebuiltSrcQueryParameters}`;

    return prebuiltSrc;
  }
}
