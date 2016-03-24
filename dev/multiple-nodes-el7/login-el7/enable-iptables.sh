#!/bin/bash
#switch to iptables rather than default firewalld for clusterware native support
#install firewalld first so that we can disable it :)
yum -y install firewalld 
systemctl disable firewalld.service
yum install -y iptables-services iptables-utils
systemctl stop firewalld.service
systemctl enable iptables
cat << EOF > /etc/sysconfig/iptables
*nat
:PREROUTING ACCEPT [0:0]
:POSTROUTING ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
COMMIT
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
-A INPUT -p icmp -j ACCEPT
-A INPUT -i lo -j ACCEPT
#SSH
-A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
#APPLIANCERULES#
-A INPUT -j REJECT --reject-with icmp-host-prohibited
-A FORWARD -j REJECT --reject-with icmp-host-prohibited
COMMIT
EOF
systemctl stop iptables; systemctl start iptables
