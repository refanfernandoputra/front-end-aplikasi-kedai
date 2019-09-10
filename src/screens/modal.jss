 {/* modal Bill*/}
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={styles.containerModal}>
                            <View style={styles.headerModal}>
                                <View style={styles.boxHeaderModal}>
                                    <Text style={styles.textHeader}>03-09-2019</Text>
                                </View>
                                <TouchableOpacity onPress={this.toggleModal}
                                    style={styles.boxClose}><Text style={styles.textClose}>X</Text></TouchableOpacity>
                            </View>
                            <View style={styles.containerOrder}>
                                <View style={styles.order}>
                                    <View style={styles.itemOrder}>
                                        <Text style={styles.textStatusWaitingOrder}>Waiting</Text>
                                    </View>
                                    <View style={styles.itemOrder}>
                                        <Text style={styles.textNameOrder}>Alpukat</Text>
                                    </View>
                                    <View style={styles.itemOrder}>
                                        <Text style={styles.textPriceOrder}>Rp. 1.200.000</Text>
                                    </View>
                                </View>

                                <View style={styles.order}>
                                    <View style={styles.itemOrder}>
                                        <Text style={styles.textStatusSentOrder}>Sent</Text>
                                    </View>
                                    <View style={styles.itemOrder}>
                                        <Text style={styles.textNameOrder}>Jus wortel</Text>
                                    </View>
                                    <View style={styles.itemOrder}>
                                        <Text style={styles.textPriceOrder}>Rp 200.000</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 2 }} />
                            <View style={styles.contentModal}>
                                <View style={styles.bill}>
                                    <View style={styles.contentBill}>
                                        <View style={styles.namePrice}>
                                            <Text style={styles.textBill} >Sub total</Text>
                                        </View>
                                        <View style={styles.price}>
                                            <Text style={styles.textBill}>Rp 192,000,00</Text>
                                        </View>
                                    </View>

                                    <View style={styles.contentBill}>
                                        <View style={styles.namePrice}>
                                            <Text style={styles.textBill} >Discount</Text>
                                        </View>
                                        <View style={styles.price}>
                                            <Text style={styles.textBill}>0%</Text>
                                        </View>
                                    </View>

                                    <View style={styles.contentBill}>
                                        <View style={styles.namePrice}>
                                            <Text style={styles.textBill} >Services Charge (55%)</Text>
                                        </View>
                                        <View style={styles.price}>
                                            <Text style={styles.textBill}>0%</Text>
                                        </View>
                                    </View>


                                    <View style={styles.contentBill}>
                                        <View style={styles.namePrice}>
                                            <Text style={styles.textBill} >Tax</Text>
                                        </View>
                                        <View style={styles.price}>
                                            <Text style={styles.textBill}>10%</Text>
                                        </View>
                                    </View>


                                    <View style={styles.contentBill}>
                                        <View style={styles.namePrice}>
                                            <Text style={styles.textTotal} >Total</Text>
                                        </View>
                                        <View style={styles.price}>
                                            <Text style={styles.textTotal}>Rp. 2.750.000</Text>
                                        </View>
                                    </View>

                                </View>

                                <TouchableOpacity style={styles.callBill}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>CALL BILL</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

