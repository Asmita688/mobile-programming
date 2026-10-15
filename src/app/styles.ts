import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F1F5F9' 
  },
  
  navbar: { 
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 32, 
    paddingVertical: 18, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    zIndex: 10
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: { 
    color: '#0F172A', 
    fontSize: 18, 
    fontWeight: '700'
  },
  
  profileSection: {
    position: 'relative'
  },
  profileTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#DBEAFE',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#93C5FD'
  },
  profileCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileInitials: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700'
  },
  profileNameText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E3A8A'
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    width: 140,
    padding: 6,
    zIndex: 100
  },
  dropdownLogoutBtn: {
    backgroundColor: '#FEF2F2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  dropdownLogoutText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 13
  },

  content: { 
    paddingVertical: 36,
    paddingHorizontal: 24,
    backgroundColor: '#F1F5F9', 
    flexGrow: 1, 
    alignItems: 'center',
    paddingBottom: 90
  },
  
  card: { 
    width: '100%',
    maxWidth: 580,
    backgroundColor: '#E0F2FE', 
    borderRadius: 16, 
    padding: 36, 
    borderWidth: 1,
    borderColor: '#BAE6FD',
    shadowColor: '#000000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, 
    shadowRadius: 10, 
    elevation: 3 
  },

  bottomNavbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 10
  },
  bottomNavBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16
  },
  bottomNavIcon: {
    fontSize: 18,
    marginBottom: 2
  },
  bottomNavText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B'
  },
  bottomNavTextActive: {
    color: '#1D4ED8',
    fontWeight: '700'
  },
  
  title: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#0F172A', 
    marginBottom: 4,
    letterSpacing: -0.3
  },
  subtitle: { 
    fontSize: 14, 
    color: '#475569', 
    marginBottom: 24,
    lineHeight: 20
  },
  label: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: '#0F172A', 
    marginBottom: 8 
  },
  
  inputRow: { 
    flexDirection: 'row', 
    gap: 12, 
    marginBottom: 20 
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8
  },
  input: { 
    flex: 1, 
    fontSize: 14,
    color: '#0F172A'
  },
  inputFull: { 
    backgroundColor: '#FFFFFF',
    borderWidth: 1, 
    borderColor: '#CBD5E1', 
    borderRadius: 8, 
    paddingHorizontal: 16,
    paddingVertical: 12, 
    fontSize: 14, 
    color: '#0F172A',
    marginBottom: 20 
  },
  
  primaryBtn: { 
    backgroundColor: '#0F172A', 
    borderRadius: 24, 
    paddingHorizontal: 24, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  primaryBtnFull: { 
    backgroundColor: '#0F172A', 
    borderRadius: 8, 
    paddingVertical: 13, 
    alignItems: 'center', 
    marginTop: 4 
  },
  secondaryBtn: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 8, 
    paddingVertical: 12, 
    alignItems: 'center', 
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#CBD5E1'
  },
  switchAuthBtn: { 
    marginTop: 16, 
    alignItems: 'center' 
  },
  switchAuthText: { 
    color: '#1D4ED8', 
    fontSize: 13, 
    fontWeight: '600' 
  },
  btnText: { 
    color: '#FFFFFF', 
    fontWeight: '600', 
    fontSize: 14 
  },
  secondaryBtnText: {
    color: '#0F172A',
    fontWeight: '600',
    fontSize: 13
  },

  resultBox: { 
    borderTopWidth: 1, 
    borderTopColor: '#CBD5E1', 
    paddingTop: 20, 
    marginTop: 16 
  },
  statusHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 14 
  },
  badge: { 
    paddingVertical: 4, 
    paddingHorizontal: 10, 
    borderRadius: 6, 
    fontWeight: '600', 
    fontSize: 11,
    overflow: 'hidden'
  },
  badgeSmall: { 
    paddingVertical: 3, 
    paddingHorizontal: 8, 
    borderRadius: 6, 
    fontWeight: '600', 
    fontSize: 10,
    overflow: 'hidden'
  },
  badgeSafe: { 
    backgroundColor: '#DCFCE7', 
    color: '#166534' 
  },
  badgeCaution: { 
    backgroundColor: '#FEF3C7', 
    color: '#92400E' 
  },
  badgeDanger: { 
    backgroundColor: '#FEE2E2', 
    color: '#991B1B' 
  },
  scoreText: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: '#334155' 
  },
  sectionHeader: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: '#0F172A', 
    marginBottom: 8 
  },
  reasonText: { 
    fontSize: 13, 
    color: '#334155', 
    marginBottom: 6,
    lineHeight: 20 
  },
  
  historyContainer: {
    gap: 12,
    marginTop: 8
  },
  historyItemCard: { 
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  historyUrl: { 
    flex: 1, 
    fontSize: 13, 
    color: '#0F172A',
    fontWeight: '500'
  },
  emptyText: { 
    fontSize: 13, 
    color: '#64748B', 
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 24
  },
  
  tipsContainer: {
    gap: 12,
    marginTop: 8
  },
  tipCard: { 
    backgroundColor: '#FFFFFF', 
    padding: 16, 
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: '#CBD5E1'
  },
  tipTitle: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#0F172A', 
    marginBottom: 4 
  },
  tipText: { 
    fontSize: 13, 
    color: '#475569',
    lineHeight: 18
  },
  statusMsg: { 
    marginTop: 12, 
    textAlign: 'center', 
    fontSize: 13, 
    color: '#16A34A',
    fontWeight: '600'
  },
  
  authHeader: { 
    alignItems: 'center', 
    marginBottom: 24 
  },
  authIcon: { 
    fontSize: 36, 
    marginBottom: 8 
  },
  demoText: { 
    fontSize: 11, 
    color: '#64748B', 
    textAlign: 'center', 
    marginTop: 16 
  }
});

export default function StylesRoute() {
  return null;
}