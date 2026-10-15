import { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { db, onValue, push, ref, set } from './firebase';
import { styles } from './styles';

type TabType = 'scan' | 'history' | 'report' | 'tips';
type StatusType = 'SAFE' | 'CAUTION' | 'DANGEROUS';

interface ScanItem {
  id?: string;
  url: string;
  domain?: string;
  status: StatusType;
  score: number;
  reasons: string[];
  userEmail?: string;
  
}

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string }>({ email: '', name: '' });
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<TabType>('scan');
  const [urlInput, setUrlInput] = useState<string>('');
  const [scanResult, setScanResult] = useState<ScanItem | null>(null);
  const [history, setHistory] = useState<ScanItem[]>([]);
  const [reportUrl, setReportUrl] = useState<string>('');
  const [reportReason, setReportReason] = useState<string>('');
  const [reportStatus, setReportStatus] = useState<string>('');

  useEffect(() => {
    if (isLoggedIn) {
      const historyRef = ref(db, 'scans');
      const unsubscribe = onValue(historyRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const parsedHistory: ScanItem[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));
          setHistory(parsedHistory.reverse());
        } else {
          setHistory([]);
        }
      });

      return () => unsubscribe();
    }
  }, [isLoggedIn]);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const usernamePart = trimmedEmail.split('@')[0];
    const formattedName = usernamePart.charAt(0).toUpperCase() + usernamePart.slice(1);

    setCurrentUser({ email: trimmedEmail, name: formattedName });

    const nepaliTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kathmandu',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date());

    try {
      // 1. User Profiles Collection (`users/`)
      const userKey = trimmedEmail.replace(/[^a-zA-Z0-9]/g, '_');
      const userRef = ref(db, `users/${userKey}`);
      
      await set(userRef, {
        name: formattedName,
        email: trimmedEmail,
        role: 'user',
        lastLogin: nepaliTime
      });
    } catch (error) {
      console.error('Error saving user profile to Firebase:', error);
    }

    setIsLoggedIn(true);
    setEmail('');
    setPassword('');
  };

  const handleLogout = () => {
    setShowDropdown(false);
    setIsLoggedIn(false);
    setCurrentUser({ email: '', name: '' });
    setScanResult(null);
  };

  const extractDomain = (url: string): string => {
    let cleaned = url.replace(/^https?:\/\//, '').split('/')[0];
    return cleaned.split('?')[0];
  };

  const handleScan = async () => {
    if (!urlInput.trim()) return;

    const domain = extractDomain(urlInput);
    let riskScore = 0;
    let reasons: string[] = [];

    if (!urlInput.startsWith("https://")) {
      riskScore += 30;
      reasons.push("❌ Missing secure HTTPS connection");
    } else {
      reasons.push("✅ Uses secure HTTPS connection");
    }

    if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(urlInput)) {
      riskScore += 40;
      reasons.push("❌ Uses an IP address instead of domain");
    }

    if (urlInput.length > 70) {
      riskScore += 20;
      reasons.push("⚠️ Unusually long link");
    }

    const suspiciousWords = ["login", "verify", "free", "update", "account", "bank", "secure"];
    if (suspiciousWords.some((w) => urlInput.toLowerCase().includes(w))) {
      riskScore += 20;
      reasons.push("⚠️ Contains sensitive keywords");
    }

    let status: StatusType = "SAFE";
    if (riskScore >= 30 && riskScore < 60) status = "CAUTION";
    else if (riskScore >= 60) status = "DANGEROUS";

    // 2. URL Scan Records Collection (`scans/`)
    const newScan = {
      url: urlInput,
      domain: domain,
      status: status,
      score: riskScore,
      reasons: reasons,
      userEmail: currentUser.email,
      
    };

    setScanResult(newScan);

    try {
      const scansListRef = ref(db, 'scans');
      const newScanRef = push(scansListRef);
      await set(newScanRef, newScan);
    } catch (error) {
      console.error('Error saving scan to Firebase:', error);
    }
  };

  const openLink = (targetUrl: string) => {
    const formattedUrl = targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`;
    Linking.openURL(formattedUrl).catch(() => Alert.alert("Error", "Cannot open URL"));
  };

  const handleReport = async () => {
    if (!reportUrl.trim() || !reportReason.trim()) {
      setReportStatus("Please fill in both fields.");
      return;
    }

    // 3. Reported Threats Collection (`reports/`)
    const newReport = {
      url: reportUrl,
      domain: extractDomain(reportUrl),
      reason: reportReason,
      status: 'PENDING',
      reportedBy: currentUser.email,
    };

    try {
      const reportsListRef = ref(db, 'reports');
      const newReportRef = push(reportsListRef);
      await set(newReportRef, newReport);

      setReportStatus("Report saved to Firebase successfully!");
      setReportUrl('');
      setReportReason('');
    } catch (error) {
      console.error('Error saving report to Firebase:', error);
      setReportStatus("Failed to submit report.");
    }
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <View style={styles.authHeader}>
              <Text style={styles.authIcon}>🔒</Text>
              <Text style={styles.title}>LinkShield</Text>
              <Text style={styles.subtitle}>
                {authMode === 'signin' ? 'Sign in to access link analysis' : 'Create an account to get started'}
              </Text>
            </View>

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.inputFull}
              placeholder="user@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.inputFull}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.primaryBtnFull} onPress={handleAuth}>
              <Text style={styles.btnText}>
                {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.switchAuthBtn} 
              onPress={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
            >
              <Text style={styles.switchAuthText}>
                {authMode === 'signin' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.demoText}>Tip: Enter any email and 6+ char password to log in.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🔒 LinkShield</Text>
        </View>
        
        <View style={styles.profileSection}>
          <TouchableOpacity 
            style={styles.profileTrigger} 
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <View style={styles.profileCircle}>
              <Text style={styles.profileInitials}>{currentUser.name.charAt(0).toUpperCase()}</Text>
            </View>
            <Text style={styles.profileNameText}>{currentUser.name} ▼</Text>
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownLogoutBtn} onPress={handleLogout}>
                <Text style={styles.dropdownLogoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          {activeTab === 'scan' && (
            <View>
              <Text style={styles.title}>LinkShield</Text>
              <Text style={styles.subtitle}>Verify Suspicious Links</Text>

              <View style={styles.inputRow}>
                <View style={styles.searchInputContainer}>
                  <Text style={styles.searchIcon}>🔍</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Search URL..."
                    placeholderTextColor="#94A3B8"
                    value={urlInput}
                    onChangeText={setUrlInput}
                    autoCapitalize="none"
                  />
                </View>
                <TouchableOpacity style={styles.primaryBtn} onPress={handleScan}>
                  <Text style={styles.btnText}>Check</Text>
                </TouchableOpacity>
              </View>

              {scanResult && (
                <View style={styles.resultBox}>
                  <View style={styles.statusHeader}>
                    <Text style={[
                      styles.badge, 
                      scanResult.status === 'SAFE' && styles.badgeSafe,
                      scanResult.status === 'CAUTION' && styles.badgeCaution,
                      scanResult.status === 'DANGEROUS' && styles.badgeDanger,
                    ]}>
                      {scanResult.status}
                    </Text>
                    <Text style={styles.scoreText}>Risk Score: {scanResult.score}/100</Text>
                  </View>

                  <Text style={styles.sectionHeader}>Analysis Details</Text>
                  {scanResult.reasons.map((reason, index) => (
                    <Text key={index} style={styles.reasonText}>• {reason}</Text>
                  ))}

                  <TouchableOpacity 
                    style={styles.secondaryBtn} 
                    onPress={() => openLink(scanResult.url)}
                  >
                    <Text style={styles.secondaryBtnText}>Open Link</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {activeTab === 'history' && (
            <View>
              <Text style={styles.title}>Scan History</Text>
              <Text style={styles.subtitle}>Synced live with Firebase Database.</Text>

              {history.length === 0 ? (
                <Text style={styles.emptyText}>No recent scans found.</Text>
              ) : (
                <View style={styles.historyContainer}>
                  {history.map((item, index) => (
                    <View key={index} style={styles.historyItemCard}>
                      <Text style={[
                        styles.badgeSmall, 
                        item.status === 'SAFE' && styles.badgeSafe,
                        item.status === 'CAUTION' && styles.badgeCaution,
                        item.status === 'DANGEROUS' && styles.badgeDanger,
                      ]}>
                        {item.status}
                      </Text>
                      <Text style={styles.historyUrl} numberOfLines={1}>{item.url}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {activeTab === 'report' && (
            <View>
              <Text style={styles.title}>Report Malicious Link</Text>
              <Text style={styles.subtitle}>Help others stay safe by reporting suspicious URLs.</Text>

              <Text style={styles.label}>Suspicious URL</Text>
              <TextInput
                style={styles.inputFull}
                placeholder="https://phishing-site.com"
                value={reportUrl}
                onChangeText={setReportUrl}
                autoCapitalize="none"
              />

              <Text style={styles.label}>Reason / Threat Type</Text>
              <TextInput
                style={styles.inputFull}
                placeholder="Phishing, Malware, Scam..."
                value={reportReason}
                onChangeText={setReportReason}
              />

              <TouchableOpacity style={styles.primaryBtnFull} onPress={handleReport}>
                <Text style={styles.btnText}>Submit Report</Text>
              </TouchableOpacity>

              {reportStatus ? <Text style={styles.statusMsg}>{reportStatus}</Text> : null}
            </View>
          )}

          {activeTab === 'tips' && (
            <View>
              <Text style={styles.title}>Safety Cyber Tips</Text>
              <Text style={styles.subtitle}>Best practices to stay secure online.</Text>

              <View style={styles.tipsContainer}>
                <View style={styles.tipCard}>
                  <Text style={styles.tipTitle}>🔒 Verify Before You Trust</Text>
                  <Text style={styles.tipText}>Always check links carefully using LinkShield before opening them.</Text>
                </View>

                <View style={styles.tipCard}>
                  <Text style={styles.tipTitle}>🛡️ Use Multi Factor Authentication</Text>
                  <Text style={styles.tipText}>Secure your personal accounts with an extra layer of protection.</Text>
                </View>

                <View style={styles.tipCard}>
                  <Text style={styles.tipTitle}>🔗 Check the Full URL</Text>
                  <Text style={styles.tipText}>Look out for domain spoofing, character typos, and deceptive spellings.</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomNavbar}>
        <TouchableOpacity 
          style={styles.bottomNavBtn} 
          onPress={() => setActiveTab('scan')}
        >
          <Text style={styles.bottomNavIcon}>🛡️</Text>
          <Text style={[styles.bottomNavText, activeTab === 'scan' && styles.bottomNavTextActive]}>Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.bottomNavBtn} 
          onPress={() => setActiveTab('history')}
        >
          <Text style={styles.bottomNavIcon}>📜</Text>
          <Text style={[styles.bottomNavText, activeTab === 'history' && styles.bottomNavTextActive]}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.bottomNavBtn} 
          onPress={() => setActiveTab('report')}
        >
          <Text style={styles.bottomNavIcon}>🚨</Text>
          <Text style={[styles.bottomNavText, activeTab === 'report' && styles.bottomNavTextActive]}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.bottomNavBtn} 
          onPress={() => setActiveTab('tips')}
        >
          <Text style={styles.bottomNavIcon}>💡</Text>
          <Text style={[styles.bottomNavText, activeTab === 'tips' && styles.bottomNavTextActive]}>Tips</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}