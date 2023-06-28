// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

interface SettingsType {
  wifiName?: string;
  wifiPwd?: string;
  wifiVisible?: boolean;
  wifiChannel?: string;
  wifiIntIP?: string;
  wifiWPA?: string;
  wifiWPAKeyMgmt?: string;
  wifiWPAPairwise?: string;
  wifiRSNPairwise?: string;
  cardDefault?: string;
  cardDeauth?: string;
  cardMonitor?: string;
  cardHotspot?: string;
  securityBehaviour?: string;
  overrideBehaviour?: string;
  securityInterfaceBehaviour?: string;
  securityTryCount?: string;
  securityPassword?: string;
  deviceLowBattery?: string;
  interfaceAnimatedBG?: boolean;
  interfaceLoginBG?: boolean;
  interfaceZoom?: number;
}

export default SettingsType;
